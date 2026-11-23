#!/bin/sh
# Gera index.html (arquivo único, offline) a partir de:
#   src/head.part.html  -> HTML e CSS
#   src/bank.part.js    -> banco de questões, draw() e grade()
#   src/ui.part.js      -> interface
# Edite os arquivos em src/ e rode este script; não edite index.html à mão.
set -e
cd "$(dirname "$0")/.."
cat src/head.part.html src/bank.part.js src/ui.part.js > index.html
echo "index.html gerado ($(wc -c < index.html) bytes)"
