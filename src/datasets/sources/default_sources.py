"""Registers all available default sources."""
from .csv_source import CSVSource
from .pandas_source import PandasSource
from .source_registry import register_source
from .tfds_source import TFDSSource


def register_default_sources() -> None:
  """Register all the default sources."""
  register_source(CSVSource)
  register_source(TFDSSource)
  register_source(PandasSource)
