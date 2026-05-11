"""Load files under src/backend/data to a GCS bucket."""

from __future__ import annotations

import os
from pathlib import Path

from dotenv import load_dotenv
from google.cloud import storage

DATA_DIR = Path(__file__).resolve().parent.parent / "data"


def main() -> None:
    load_dotenv()
    bucket_name = os.environ.get("GCS_BUCKET_NAME")
    if not bucket_name:
        raise SystemExit("Set GCS_BUCKET_NAME in .env")
    if not DATA_DIR.is_dir():
        raise SystemExit(f"Missing data dir: {DATA_DIR}")

    bucket = storage.Client().bucket(bucket_name)
    for path in DATA_DIR.rglob("*"):
        if path.is_file():
            key = path.relative_to(DATA_DIR).as_posix()
            bucket.blob(key).upload_from_filename(str(path))
            print(f"Uploaded gs://{bucket.name}/{key}")


if __name__ == "__main__":
    main()
