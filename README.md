# Lilac

### Dev setup

Before you start developing, install the following tools:

- [Install XCode and sign license](https://apps.apple.com/us/app/xcode/id497799835?mt=12)
- [XCode command line tools](https://mac.install.guide/commandlinetools/4.html) (MacOS)
- [homebrew](https://brew.sh/) (MacOS)
- [pyenv](https://github.com/pyenv/pyenv) (Python version management)
- [Current python version](./.python-version)
- [Python Poetry](https://pypi.org/project/poetry/)
- [GitHub CLI](https://cli.github.com/)
- [VSCode](https://code.visualstudio.com/)
- [DuckDB CLI](https://duckdb.org/docs/installation/index)
- [Refined Github extension](https://github.com/refined-github/refined-github)

### Setup environment

```sh
./scripts/setup.sh
```

### Source

The source ingests user data and converts it to parquet files.

#### Ingesting data

To run the `source` locally as a binary:

```sh
poetry run python -m src.datasets.dataset_loader \
  --dataset_name=$DATASET \
  --output_dir=./gcs_cache/ \
  --config_path=./datasets/the_movies_dataset.json
```

### Web Server

#### Development

To run the web server in dev mode with fast edit-refresh:

```sh
./run_server_dev.sh
```

#### Testing

Run all the presubmits:

```sh
./scripts/presubmit.sh
```

Test python:

```sh
./scripts/test_py.sh
```

Test JavaScript:

```sh
./scripts/test_ts.sh
```

### Troubleshooting

#### pyenv install not working on M1

If your pyenv does not work on M1 machines after installing xcode, you may need to reinstall xcode command line tools. [Stack Overflow Link](https://stackoverflow.com/questions/65778888/pyenv-configure-error-c-compiler-cannot-create-executables)

#### No module named `_lzma`

Follow instructions from [pyenv](https://github.com/pyenv/pyenv/wiki#suggested-build-environment):

- Uninstall python via `pyenv uninstall`
- Run `brew install openssl readline sqlite3 xz zlib tcl-tk`
- Reinstall python via `pyenv install`

```sh
$ sudo rm -rf /Library/Developer/CommandLineTools
$ xcode-select --install
```

#### Installing TensorFlow on M1

M1/M2 chips need a special TF installation. These steps are taken from the official
[Apple docs](https://developer.apple.com/metal/tensorflow-plugin/):

1. Click [here](https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-MacOSX-arm64.sh) to download Conda env
2. Run:

```
chmod +x ~/Downloads/Miniforge3-MacOSX-arm64.sh
sh ~/Downloads/Miniforge3-MacOSX-arm64.sh
source ~/miniforge3/bin/activate
```

3. Install the TensorFlow `2.9.0` dependencies: `conda install -c apple tensorflow-deps=2.9.0`

#### Too many open files on MacOS

When downloading and pre-processing TFDS datasets, you might get `too many open files`
error. To fix, increase [the max open files limit](https://superuser.com/a/1679740).

### Relevant projects

- [Voxel51](https://voxel51.com/docs/fiftyone/)
  - Open-source tool for visualizing datasets.
- [Fastdup](https://github.com/visual-layer/fastdup)
  - Easily manage, clean & curate Visual Data
  - Can scale to 400M images (low Cost: can process 12M images on a $1 cloud machine budget)
  - Enterprise version coming soon: https://www.visual-layer.com/
- [Scale Nucleus](https://scale.com/nucleus)
  - Allows people to upload ML data, label it via UI or by sending it to a pool of labelers. Allows people to train a model and analyze the performance. Nucleus is one of their products for browsing data. Valuation is around $10B!
- [Labelbox](https://labelbox.com/)
  - Another largish company, similar to Scale. $190M in funding.
- [Deepnote](https://deepnote.com/)
  - Python notebook for data. Integrates with BigQuery, GCS, Snowflake, MySQL, Postgre, and another 20+ sources.
- [Tadviewer](https://www.tadviewer.com/)
  - Open source desktop app for browsing CSV, Parquet, SQLite and DuckDB data.
- [Datasette](https://datasette.io/)
  - Open source. Similar to Tadviewer. See [a related twitter thread](https://twitter.com/simonw/status/1572285367382061057?s=46&t=6Rc-qn2_pufUx7hwG7z_PQ) from the creator.
- [VisiData](https://www.visidata.org/)
  - Open source. Similar to Tadviewer and Datasette, but for the terminal.
- [Amazon Sagemaker Data Wrangler](https://aws.amazon.com/sagemaker/data-wrangler)
  - Build a pipeline for preparing data for ML.
- [bit.io](https://bit.io/)
  - Drag and drop a file to get a Postgres database and a short link you can share with people. You can also paste a URL to data on the web.
- [Top companies in data technology](https://www.valuer.ai/blog/top-companies-in-data-technology)
