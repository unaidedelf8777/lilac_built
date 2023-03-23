"""Registers all available default signals."""
from .signal_registry import register_signal
from .text_statistics import TextStatisticsSignal


def register_default_signals() -> None:
  """Register all the default signals."""
  # Text.
  register_signal(TextStatisticsSignal)
