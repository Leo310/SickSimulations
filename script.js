const canvas = document.getElementById("world");
const ctx = canvas.getContext("2d");

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

function V2(x, y) {
  this.x = x;
  this.y = y;
}
let i = 0
function Pixel(position, width, height, vel, accel, mass, color) {
  this.id = i++;
  this.position = position;
  this.width = width;
  this.height = height;
  this.color = color;
  this.vel = vel;
  this.accel = accel;
  this.mass = mass;
}

function drawPixels(pixels) {
  pixels.forEach((pixel) => {
    ctx.fillStyle = pixel.color;
    ctx.fillRect(pixel.position.x, pixel.position.y, pixel.width, pixel.height);
  });
}

function createPixels(count, size, vel, accel, mass, color) {
  let pixels = [];
  for (let i = 0; i < count; i++) {
    pixels.push(
      new Pixel(
        new V2(
          Math.floor(Math.random() * (canvas.clientWidth-400))+200,
          Math.floor(Math.random() * (canvas.clientHeight-400))+200
        ),
        size,
        size,
        vel,
        accel,
        mass,
        color
      )
    );
  }
  return pixels;
}

function rule(pixels1, pixels2, g) {
  pixels1.forEach((pixel1) => {
    pixels2.forEach((pixel2) => {
      const distanceX = pixel1.position.x - pixel2.position.x;
      const distanceY = pixel1.position.y - pixel2.position.y;
      let distance = Math.sqrt(distanceX * distanceX + distanceY*distanceY);
      distance = Math.max(distance, 0.001)

      force = (g * pixel1.mass * pixel2.mass) / distance;

      const ratioY = distanceY / distance;
      const ratioX = distanceX / distance;

      pixel1.accel.x = ratioX * (force / pixel1.mass);
      pixel1.accel.y = ratioY * (force / pixel1.mass);

      pixel1.vel.x += pixel1.accel.x;
      pixel1.vel.y += pixel1.accel.y;
    });

    pixel1.position.x += pixel1.vel.x / 60;
    pixel1.position.y += pixel1.vel.y / 60;
  });
}

let pixels = createPixels(2, 50, new V2(0, 0), new V2(0, 0), 100, "green");
//let pixels2 = createPixels(1, 50, new V2(0, 0), new V2(0, 0), 1000, "red");

function main() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  rule(pixels, pixels, 20);

  drawPixels(pixels);
  requestAnimationFrame(main);
}
main();
