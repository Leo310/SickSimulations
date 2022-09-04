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
    const pixel =
        new Pixel(new Vec(Math.floor(Math.random() * canvas.clientWidth),
                          Math.floor(Math.random() * canvas.clientHeight)),
                  size, size, new Vec(0, 0), mass, color)
    pixels.push(pixel);
  }
  return pixels;
}

function rule(pixels1, pixels2, g) {
  pixels1.forEach(p1 => {
    pixels2.forEach(p2 => {
      const distanceX = p1.position.x - p2.position.x;
      const distanceY = p1.position.y - p2.position.y;
      let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance > 20 && distance < 80) {
        const force = (g * p1.mass * p2.mass) / distance;

        const ratioY = distanceY / distance;
        const ratioX = distanceX / distance;
        const accelX = ratioX * (force / p1.mass);
        const accelY = ratioY * (force / p1.mass);

        p1.vel.x += accelX;
        p1.vel.y += accelY;
      }
    });
    p1.position.x += p1.vel.x;
    p1.position.y += p1.vel.y;
    if (p1.position.x > canvas.width || p1.position.x < 0)
      p1.vel.x *= -1;
    if (p1.position.y > canvas.height || p1.position.y < 0)
      p1.vel.y *= -1;
  });
}

let pixels = createPixels(200, 20, 1, "#673AB7");
let pixels2 = createPixels(200, 20, 1, "#C62828");
// let pixels3 = createPixels(100, 20, 1, "#303F9F");
// let pixels4 = createPixels(100, 20, 1, "#00897B");

let time = performance.now()
function main() {
  if (performance.now() - time >= 1000 / 60) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#121212";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    rule(pixels, pixels, -0.1);
    // rule(pixels, pixels2, -0.1);
    // rule(pixels2, pixels, 0.1);
    // rule(pixels2, pixels2, -0.1);
    // rule(pixels, pixels3, 0.01);
    // rule(pixels2, pixels3, -0.01);
    // rule(pixels3, pixels3, -0.01);
    // rule(pixels4, pixels4, 0.01);
    // rule(pixels4, pixels, 0.01);
    // rule(pixels3, pixels4, 0.01);

    drawPixels(pixels);
    // drawPixels(pixels2);
    // drawPixels(pixels3);
    // drawPixels(pixels4);

    time = performance.now()
  }
  requestAnimationFrame(main);
}
main();
