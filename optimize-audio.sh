#!/bin/bash

INPUT_DIR="public/audio/sections"
OUTPUT_DIR="$INPUT_DIR/optimized"

mkdir -p "$OUTPUT_DIR"

for file in "$INPUT_DIR"/*.mp3; do
  filename=$(basename "$file" .mp3)

  echo "🎧 Procesando: $filename.mp3"

  # 1. Recorte + normalización + fade (loop friendly)
  ffmpeg -y -i "$file" \
    -af "loudnorm,afade=t=in:ss=0:d=0.4,afade=t=out:st=19.6:d=0.4" \
    -t 20 \
    "$OUTPUT_DIR/${filename}_temp.wav"

  # 2. OPUS (principal)
  ffmpeg -y -i "$OUTPUT_DIR/${filename}_temp.wav" \
    -c:a libopus \
    -b:a 48k \
    -ac 1 \
    "$OUTPUT_DIR/$filename.opus"

  # 3. MP3 fallback optimizado
  ffmpeg -y -i "$OUTPUT_DIR/${filename}_temp.wav" \
    -c:a libmp3lame \
    -b:a 64k \
    -ac 1 \
    "$OUTPUT_DIR/$filename.mp3"

  # 4. Limpieza
  rm "$OUTPUT_DIR/${filename}_temp.wav"

  echo "✅ $filename listo"
done

echo "🎉 Todos los audios optimizados"
