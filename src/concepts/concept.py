"""Defines the concept and the concept models."""
from typing import Any, Literal, Optional, Sequence, Union

import numpy as np
from pydantic import BaseModel, Field
from sklearn import linear_model

from ..embeddings.embedding_registry import get_embed_fn
from ..schema import RichData

LOCAL_CONCEPT_NAMESPACE = 'local'


class ExampleOrigin(BaseModel):
  """The origin of an example."""
  # The namespace that holds the dataset.
  dataset_namespace: str

  # The name of the dataset.
  dataset_name: str

  # The id of row in the dataset that the example was added from.
  dataset_row_id: str


class ExampleIn(BaseModel):
  """An example in a concept without the id (used for adding new examples)."""
  label: bool
  text: Optional[str]
  img: Optional[bytes]
  origin: Optional[ExampleOrigin]


class Example(ExampleIn):
  """A single example in a concept used for training a concept model."""
  id: str


class Concept(BaseModel):
  """A concept is a collection of examples."""
  # The namespace of the concept.
  namespace: str = LOCAL_CONCEPT_NAMESPACE
  # The name of the concept.
  concept_name: str
  # The type of the data format that this concept represents.
  type: Union[Literal['text'], Literal['img']]
  data: dict[str, Example]
  version: int = 0


class ConceptModel(BaseModel):
  """A concept model."""

  class Config:
    arbitrary_types_allowed = True
    private_attributes_are_hidden = True

  # The concept that this model is for.
  namespace: str
  concept_name: str

  # The name of the embedding for this model.
  embedding_name: str
  version: int = -1

  # The following fields are excluded from JSON serialization, but still pickleable.
  embeddings: dict[str, np.ndarray] = Field(exclude=True)

  _model: linear_model.LogisticRegression = Field(exclude=True)

  def __init__(self, **data: Any):
    super().__init__(**data)
    self._model = linear_model.LogisticRegression(solver='liblinear', class_weight='balanced')

  def fit(self, embeddings: Union[np.ndarray, list[np.ndarray]], labels: list[bool]) -> None:
    """Fit the model to the provided data."""
    self._model.fit(embeddings, labels)

  def score_embeddings(self, embeddings: np.ndarray) -> np.ndarray:
    """Get the scores for the provided embeddings."""
    return self._model.predict_proba(embeddings)[:, 1]

  def score(self, examples: Sequence[RichData]) -> list[float]:
    """Get the scores for the provided examples."""
    _, embed_fn = get_embed_fn(self.embedding_name)
    embeddings = embed_fn(examples)
    return self.score_embeddings(embeddings).tolist()
