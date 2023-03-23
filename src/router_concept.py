"""Router for the concept database."""

from typing import Optional

import numpy as np
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from .concepts.concept import Concept, ConceptModel
from .concepts.db_concept import (
    CONCEPT_DB,
    CONCEPT_MODEL_DB,
    ConceptUpdate,
)
from .embeddings.embedding_registry import get_embed_fn

router = APIRouter()


@router.get('/{namespace}/{concept_name}', response_model_exclude_none=True)
def get_concept(namespace: str, concept_name: str) -> Concept:
  """Get a concept from a database."""
  concept = CONCEPT_DB.get(namespace, concept_name)
  if not concept:
    raise HTTPException(status_code=404,
                        detail=f'Concept "{namespace}/{concept_name}" was not found')
  return concept


@router.post('/{namespace}/{concept_name}', response_model_exclude_none=True)
def post_concept(namespace: str, concept_name: str, change: ConceptUpdate) -> Concept:
  """Edit a concept in the database."""
  return CONCEPT_DB.edit(namespace, concept_name, change)


class ScoreExample(BaseModel):
  """Example to score along a specific concept."""
  text: Optional[str]
  img: Optional[bytes]


class ScoreBody(BaseModel):
  """Request body for the score endpoint."""
  examples: list[ScoreExample]


class ScoreResponse(BaseModel):
  """Response body for the score endpoint."""
  scores: list[float]
  model_updated: bool


class ConceptModelResponse(BaseModel):
  """Response body for the get_concept_model endpoint."""
  model: ConceptModel
  model_updated: bool


@router.get('/{namespace}/{concept_name}/{embedding_name}')
def get_concept_model(namespace: str, concept_name: str, embedding_name: str) -> dict:
  """Get a concept model from a database."""
  concept = CONCEPT_DB.get(namespace, concept_name)
  if not concept:
    raise HTTPException(status_code=404,
                        detail=f'Concept "{namespace}/{concept_name}" was not found')

  model = CONCEPT_MODEL_DB.get(namespace, concept_name, embedding_name)
  if not model:
    raise HTTPException(
        status_code=404,
        detail=f'Concept model "{namespace}/{concept_name}/{embedding_name}" was not found')

  model, model_updated = _sync_model_with_concept(concept, model)
  return ConceptModelResponse(model=model, model_updated=model_updated).dict(exclude_none=True)


@router.post('/{namespace}/{concept_name}/{embedding_name}/score', response_model_exclude_none=True)
def score(namespace: str, concept_name: str, embedding_name: str, body: ScoreBody) -> ScoreResponse:
  """Score examples along the specified concept."""
  concept = CONCEPT_DB.get(namespace, concept_name)
  if not concept:
    raise HTTPException(status_code=404,
                        detail=f'Concept "{namespace}/{concept_name}" was not found')
  model = CONCEPT_MODEL_DB.get(namespace, concept_name, embedding_name)
  if not model:
    raise HTTPException(
        status_code=404,
        detail=f'Concept model "{namespace}/{concept_name}/{embedding_name}" was not found')

  model, model_updated = _sync_model_with_concept(concept, model)

  # TODO(smilkov): Support images.
  texts = [example.text or '' for example in body.examples]
  return ScoreResponse(scores=model.score(texts), model_updated=model_updated)


def _sync_model_with_concept(concept: Concept, model: ConceptModel) -> tuple[ConceptModel, bool]:
  """Update the model with the latest labeled concept data."""
  if concept.version == model.version:
    # Already in sync.
    return model, False

  concept_embeddings: dict[str, np.ndarray] = {}
  _, embed_fn = get_embed_fn(model.embedding_name)

  # Compute the embeddings for the examples with cache miss.
  texts_of_missing_embeddings: dict[str, str] = {}
  for id, example in concept.data.items():
    if id in model.embeddings:
      # Cache hit.
      concept_embeddings[id] = model.embeddings[id]
    else:
      # Cache miss.
      # TODO(smilkov): Support images.
      texts_of_missing_embeddings[id] = example.text or ''
  missing_ids = texts_of_missing_embeddings.keys()
  missing_embeddings = embed_fn(list(texts_of_missing_embeddings.values()))

  for id, embedding in zip(missing_ids, missing_embeddings):
    concept_embeddings[id] = embedding

  embedding_matrix = list(concept_embeddings.values())
  new_labels = [concept.data[id].label for id in concept_embeddings.keys()]

  model.fit(embedding_matrix, new_labels)
  model.embeddings = concept_embeddings
  # Synchronize the model version with the concept version.
  model.version = concept.version
  CONCEPT_MODEL_DB.save(model)

  return model, True
