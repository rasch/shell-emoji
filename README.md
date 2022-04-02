# shell-emoji

[![builds.sr.ht status](https://builds.sr.ht/~rasch/shell-emoji.svg)](https://builds.sr.ht/~rasch/shell-emoji?)

Emoji for the shell 🐢

## Usage

```sh
echo "$e_melting_face"
# => 🫠

git commit -m "$e_tada Initial commit"
```

## Installation

```sh
# download emoji variables
curl -O https://git.sr.ht/~rasch/shell-emoji/refs/download/0.1.0/shell-emoji-0.1.0.gz

# decompress
gunzip shell-emoji-0.1.0.gz

# source the file (put this line in ~/.bashrc or similar after testing)
. shell-emoji-0.1.0
```
