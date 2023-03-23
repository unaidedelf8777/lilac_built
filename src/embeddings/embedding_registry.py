"""Embedding registry."""
from typing import Callable, Iterable, Union

import numpy as np

from ..schema import RichData

EmbedFnType = Callable[[Iterable[RichData]], np.ndarray]


class EmbedFn:
  """A function that embeds text or images."""

  def __init__(self, embed_fn: EmbedFnType):
    self.embed_fn = embed_fn

  def __call__(self, data: Iterable[RichData]) -> np.ndarray:
    """Call the embedding function."""
    return self.embed_fn(data)


EmbeddingId = Union[str, EmbedFnType]
EMBEDDING_REGISTRY: dict[str, EmbedFn] = {}


def get_embed_fn(embedding_identifier: EmbeddingId) -> tuple[str, EmbedFn]:
  """Get an embedding name and function from an embedding identifier."""
  if isinstance(embedding_identifier, str):
    if embedding_identifier not in EMBEDDING_REGISTRY:
      raise ValueError(f'Embedding "{embedding_identifier}" not found in the registry')
    embed_fn = EMBEDDING_REGISTRY[embedding_identifier]
    embedding_name = embedding_identifier
  else:  # The embedding identifier is a function itself, so use the name as the embedding name.
    embed_fn = EmbedFn(embedding_identifier)
    embedding_name = embedding_identifier.__name__

  return embedding_name, embed_fn


def register_embed_fn(embedding_name: str) -> Callable[[EmbedFnType], EmbedFnType]:
  """Register an embedding function."""

  def decorator(embed_fn: EmbedFnType) -> EmbedFnType:
    if embedding_name in EMBEDDING_REGISTRY:
      raise ValueError(f'Embedding "{embedding_name}" already exists in the registry')

    EMBEDDING_REGISTRY[embedding_name] = EmbedFn(embed_fn)

    return embed_fn

  return decorator


def clear_embedding_registry() -> None:
  """Clear the embedding registry."""
  EMBEDDING_REGISTRY.clear()
