# Altyapı (from dockerHub):
FROM node:20.9.0-alpine
# Çalışma Alanı:
WORKDIR /app
# Dosyaları Aktar: COPY local inImage
# COPY hello.js /app
COPY . .

# After build (when image to container):
# docker run imagename
CMD node hello.js
