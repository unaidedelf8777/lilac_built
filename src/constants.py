"""Pydantic models for data, stored on GCS."""
import os
from typing import Optional, Union

from pydantic import BaseModel

DATA_JSON_FILENAME = 'data.json'
EMBEDDINGS_FILENAME = 'embeddings.npy'


def data_path() -> str:
  """Return the base path for data."""
  return os.environ['LILAC_DATA_PATH'] if 'LILAC_DATA_PATH' in os.environ else './gcs_cache'


# TODO(nsthorat): Delete the following when we remove the old agile server.


class DatasetRow(BaseModel):
  """A single labeled row."""
  text: str
  prediction: Optional[int]

  metadata: dict[str, Union[str, float]] = {}


class AddExample(BaseModel):
  """A example to be added."""
  text: str
  label: int


class LabeledExample(BaseModel):
  """A single labeled example."""
  # Points to the index in the full dataset.
  row_idx: int
  label: int


class TrainExample(BaseModel):
  """A single training example."""
  # Points to the index in the full dataset.
  row_idx: int
  label: int


class TestExample(BaseModel):
  """A single test example."""
  # Points to the index in the full dataset.
  row_idx: int
  label: int


class Dataset(BaseModel):
  """A dataset for a model."""
  # All of the data.
  data: list[DatasetRow]

  labeled_data: list[LabeledExample]
