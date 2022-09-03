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
          Math.floor(Math.random() * (canvas.clientWidth - 400)) + 200,
          Math.floor(Math.random() * (canvas.clientHeight - 400)) + 200
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
  for (let i = 0; i < pixels1.length; i++) {
    for (let j = 0; j < pixels2.length; j++) {
      if (i != j) {
        const distanceX = pixels1[i].position.x - pixels2[j].position.x;
        const distanceY = pixels1[i].position.y - pixels2[j].position.y;
        // console.log(distanceX, distanceY)
        let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        let force = 0;
        let ratioY = 0;
        let ratioX = 0;
        if (distance > 0 && distance < 800) {
          force = (g * pixels1[i].mass * pixels2[j].mass) / distance;

          ratioY = distanceY / distance;
          ratioX = distanceX / distance;
          pixels1[i].accel.x = ratioX * (force / pixels1[i].mass);
          pixels1[i].accel.y = ratioY * (force / pixels1[i].mass);
        }
        // Math.max(force, -1000)
        // console.log(ratioX)

        // console.log(i)
    // console.log(pixels1[i].vel)
      // console.log(pixels1[i].accel)
        pixels1[i].vel.x += pixels1[i].accel.x;
        pixels1[i].vel.y += pixels1[i].accel.y;
        // console.log("DistanceX: %d   DistanceY: %d   Distance: %f   Force: %f   Accel: %f   Vel: %f", distanceX, distanceY, distance, force, pixels1[1].accel.x, pixels[1].vel.x)
      }
    }
  }
  // console.log(pixels1[1].vel)
  for (let i = 0; i < pixels1.length; i++) {
    // console.log(pixels2[i].vel)
    pixels1[i].position.x += pixels1[i].vel.x;
    pixels1[i].position.y += pixels1[i].vel.y;
  }
}

let pixels = createPixels(2, 50, new V2(0, 0), new V2(0, 0), 100, "yellow");
//let pixels2 = createPixels(1, 50, new V2(0, 0), new V2(0, 0), 1000, "red");

function main() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "steelblue";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  rule(pixels, pixels, -200);

  drawPixels(pixels);
  requestAnimationFrame(main);
}
main();
