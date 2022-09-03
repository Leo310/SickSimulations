const canvas = document.getElementById("world");
const ctx = canvas.getContext("2d");

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

function Vec(x, y) {
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

function createPixels(count, size, mass, color) {
  let pixels = [];
  for (let i = 0; i < count; i++) {
    const pixel = new Pixel(
        new Vec(Math.floor(Math.random() * (canvas.clientWidth - 400)) + 200,
                Math.floor(Math.random() * (canvas.clientHeight - 400)) + 200),
        size, size, new Vec(0, 0), new Vec(0, 0), mass, color)
    pixels.push(pixel);
  }
  return pixels;
}

function rule(pixels1, pixels2, g) {
  for (let i = 0; i < pixels1.length; i++) {
    for (let j = 0; j < pixels2.length; j++) {
      if (i != j) {
        const distanceX = pixels1[i].position.x - pixels2[j].position.x;
        const distanceY = pixels1[i].position.y - pixels2[j].position.y;
        let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        let force, ratioX, ratioY = 0;
        Math.max(distance, 1)
        force = (g * pixels1[i].mass * pixels2[j].mass) / distance;

        ratioY = distanceY / distance;
        ratioX = distanceX / distance;
        pixels1[i].accel.x = ratioX * (force / pixels1[i].mass);
        pixels1[i].accel.y = ratioY * (force / pixels1[i].mass);

        pixels1[i].vel.x += pixels1[i].accel.x;
        pixels1[i].vel.y += pixels1[i].accel.y;
        // console.log(pixels1[0].vel.x)
        // console.log("DistanceX: %d   DistanceY: %d   Distance: %f   Force: %f
        // Accel: %f   Vel: %f", distanceX, distanceY, distance, force,
      }
    }
  }
  for (let i = 0; i < pixels1.length; i++) {
    if(pixels1[i].position.x + pixels1[i].vel.x > canvas.width || pixels1[i].position.x + pixels1[i].vel.x < 0)
      pixels1[i].vel.x *=-1
    if(pixels1[i].position.y + pixels1[i].vel.y > canvas.height || pixels1[i].position.y + pixels1[i].vel.y < 0)
      pixels1[i].vel.y *=-1
    pixels1[i].position.x += pixels1[i].vel.x;
    pixels1[i].position.y += pixels1[i].vel.y;
  }
}

let pixels = createPixels(10, 20, 10, "yellow");
// let pixels2 = createPixels(1, 50, new V2(0, 0), new V2(0, 0), 1000, "red");
console.log(pixels)
function main() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "steelblue";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  rule(pixels, pixels, -5);

  drawPixels(pixels);
  requestAnimationFrame(main);
}
main();
