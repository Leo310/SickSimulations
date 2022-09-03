const canvas = document.getElementById("world");
const ctx = canvas.getContext("2d");

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

function Vec(x, y) {
  this.x = x;
  this.y = y;
}
function Pixel(position, width, height, vel, mass, color) {
  this.position = position;
  this.width = width;
  this.height = height;
  this.color = color;
  this.vel = vel;
  this.mass = mass;
}

function drawPixels(pixels) {
  pixels.forEach((pixel) => {
    ctx.fillStyle = pixel.color;
    ctx.fillRect(pixel.position.x, pixel.position.y, pixel.width, pixel.height);
  });
}

function createPixels(count, size, mass, color) {
  let pixels = [];
  for (let i = 0; i < count; i++) {
    const pixel = new Pixel(
        new Vec(Math.floor(Math.random() * canvas.clientWidth),
                Math.floor(Math.random() * canvas.clientHeight)),
        size, size, new Vec(0, 0), mass, color)
    pixels.push(pixel);
  }
  return pixels;
}

function rule(pixels1, pixels2, g) {
  for (let i = 0; i < pixels1.length; i++) {
    for (let j = 0; j < pixels2.length; j++) {
      if (i != j) {
        let p1 = pixels1[i]
        let p2 = pixels2[j]
        const distanceX = p1.position.x - p2.position.x;
        const distanceY = p1.position.y - p2.position.y;
        let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        Math.max(distance, 1)
        const force = (g * p1.mass * p2.mass) / distance;

        const ratioY = distanceY / distance;
        const ratioX = distanceX / distance;
        const accelX = ratioX * (force / p1.mass)*0.5;
        const accelY = ratioY * (force / p1.mass)*0.5;

        p1.vel.x += accelX;
        p1.vel.y += accelY;
        // console.log("DistanceX: %d   DistanceY: %d   Distance: %f   Force: %f
        // Accel: %f   Vel: %f", distanceX, distanceY, distance, force,
      }
    }
  }
  for (let i = 0; i < pixels1.length; i++) {
    let p1 = pixels1[i]
    if (p1.position.x + p1.vel.x > canvas.width ||
        p1.position.x + p1.vel.x < 0)
      p1.vel.x *= -1
      if (p1.position.y + p1.vel.y > canvas.height ||
          p1.position.y + p1.vel.y < 0)
      p1.vel.y *= -1
      p1.position.x += p1.vel.x;
    p1.position.y += p1.vel.y;
  }
}

let pixels = createPixels(50, 20, 10, "#673AB7");
let pixels2 = createPixels(50, 20, 10, "#C62828");
// let pixels3 = createPixels(10, 20, 10, "#303F9F");
// let pixels4 = createPixels(10, 20, 10, "#00897B");

function main() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#121212";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  rule(pixels, pixels, -0.1);
  rule(pixels2, pixels, -0.01);
  rule(pixels, pixels2, 0.01);

  drawPixels(pixels);
  drawPixels(pixels2);
  requestAnimationFrame(main);
}
main();
