"""Smoke tests — expand as backend modules grow."""


def test_import_backend_pipeline() -> None:
    from pipelines import load_data

    assert load_data.DATA_DIR.name == "data"
