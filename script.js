const canvas = document.getElementById("world");
const ctx = canvas.getContext("2d");

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

function V2(x, y) {
  this.x = x;
  this.y = y;
}

function Pixel(position, width, height, vel, accel, mass, color) {
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

function rules(pixels1, pixels2, g) {
  pixels1.forEach((pixel1) => {
    pixels2.forEach((pixel2) => {
      const distanceX = pixel1.position.x - pixel2.position.x;
      const distanceY = pixel1.position.y - pixel2.position.y;
      const distance = Math.sqrt(distanceX ** 2, distanceY ** 2);
      let force = (g * pixel1.mass * pixel2.mass) / distance ** 2;
      force = Math.min(8000, force)

      const ratioY = distanceY / distance;
      const ratioX = distanceX / distance;

      pixel1.accel.x = -ratioX * (force / pixel1.mass);
      pixel1.accel.y = -ratioY * (force / pixel1.mass);
      pixel2.accel.x = ratioX * (force / pixel2.mass);
      pixel2.accel.y = ratioY * (force / pixel2.mass);

      pixel1.vel.x += pixel1.accel.x;
      pixel1.vel.y += pixel1.accel.y;
      pixel2.vel.x += pixel2.accel.x;
      pixel2.vel.y += pixel2.accel.y;

      pixel1.position.x += pixel1.vel.x / 60;
      pixel1.position.y += pixel1.vel.y / 60;

      pixel2.position.x += pixel2.vel.x / 60;
      pixel2.position.y += pixel2.vel.y / 60;
    });
  });
}

let pixels = createPixels(1, 50, new V2(30, 30), new V2(0, 0), 1000, "green");
let pixels2 = createPixels(1, 50, new V2(-30, -30), new V2(0, 0), 1000, "red");

function main() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  rules(pixels, pixels2, 20);

  drawPixels(pixels);
  drawPixels(pixels2);
  requestAnimationFrame(main);
}
main();
