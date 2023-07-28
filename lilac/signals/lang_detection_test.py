"""Tests for the language detection signal."""

from ..data.dataset_utils import lilac_span
from .lang_detection import LANG_CODE, LangDetectionSignal


def test_lang_detection_sentences() -> None:
  signal = LangDetectionSignal()
  signal.setup()
  docs = [
    'War doesnt show whos right, just whos left.',
    'Ein, zwei, drei, vier',
  ]
  res = list(signal.compute(docs))
  assert res == ['en', 'de']


def test_lang_detection_multiple_paragraphs() -> None:
  signal = LangDetectionSignal(split_by_paragraph=True)
  signal.setup()
  doc = 'War doesnt show whos right, just whos left.\n\nEin, zwei, drei, vier'
  res = list(signal.compute([doc]))
  assert res == [[
    lilac_span(0, 43, {LANG_CODE: 'en'}),
    lilac_span(45, 66, {LANG_CODE: 'de'}),
  ]]