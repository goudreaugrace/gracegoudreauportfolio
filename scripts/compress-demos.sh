#!/usr/bin/env bash
set -euo pipefail
mkdir -p assets/demos assets/posters

compress() {
  local src="$1"
  local dest="$2"
  local poster="$3"
  if [[ ! -f "$src" ]]; then
    echo "skip missing $src"
    return
  fi
  echo "compress $src -> $dest"
  ffmpeg -y -i "$src" -vf "scale='min(1280,iw)':-2" -c:v libx264 -pix_fmt yuv420p -crf 30 -preset medium -movflags +faststart -an "$dest" </dev/null 2>/tmp/ffmpeg-last.log
  local size
  size=$(stat -c%s "$dest")
  if (( size > 8000000 )); then
    echo "retry crf 34 $dest ($size)"
    ffmpeg -y -i "$src" -vf "scale='min(960,iw)':-2" -c:v libx264 -pix_fmt yuv420p -crf 34 -preset medium -movflags +faststart -an "$dest" </dev/null 2>/tmp/ffmpeg-last.log
  fi
  ffmpeg -y -ss 1 -i "$src" -frames:v 1 -q:v 4 "$poster" </dev/null 2>/tmp/ffmpeg-poster.log || true
  ls -lh "$dest" "$poster"
}

compress "AIScenarioModelingDemo.mov" "assets/demos/scoping-pro.mp4" "assets/posters/scoping-pro.jpg"
compress "ModelingDemo.mov" "assets/demos/scoping-pro-model.mp4" "assets/posters/scoping-pro-model.jpg"
compress "OMLandingDemo.mov" "assets/demos/order-landing.mp4" "assets/posters/order-landing.jpg"
compress "OrderMonitoringDemo.mov" "assets/demos/order-monitoring.mp4" "assets/posters/order-monitoring.jpg"
compress "ModRequestDemo.mov" "assets/demos/order-mod-request.mp4" "assets/posters/order-mod-request.jpg"
compress "CreateOrderDemo.mov" "assets/demos/order-create.mp4" "assets/posters/order-create.jpg"
compress "assets/atlas-decision-intelligence-demo.mp4" "assets/demos/atlas.mp4" "assets/posters/atlas.jpg"
compress "assets/my-pepsico-agents-demo.mp4" "assets/demos/content-agent.mp4" "assets/posters/content-agent.jpg"
compress "Wonder3DCheckout.mp4" "assets/demos/wonder-checkout.mp4" "assets/posters/wonder-checkout.jpg"
compress "Cursor Demo.mp4" "assets/demos/portfolio-build.mp4" "assets/posters/portfolio-build.jpg"
echo "done"
