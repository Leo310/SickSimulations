"""
Gravity simulation with pygame
"""
import sys
import math
import random

import pygame
import numpy as np

pygame.init()

windowsize = width, height = 1300, 700

screen = pygame.display.set_mode(windowsize)


class Pixel:

    def __init__(self, position, size, color):
        self.position = np.array(position, dtype=("float"))
        self.size = size
        self.color = color
        self.vel = np.array((0.0, 0.0))


def createPixels(num, size, color):
    pixels = []
    for _ in range(num):
        position = (random.randrange(width), random.randrange(height))
        pixels.append(Pixel(position, size, color))
    return pixels


def drawPixels(pixels):
    for pixel in pixels:
        pygame.draw.rect(
            screen, pygame.Color(pixel.color),
            pygame.Rect(pixel.position[0], pixel.position[1], pixel.size,
                        pixel.size))


def gravity(pixelsA, pixelsB, g):
    for i, p1 in enumerate(pixelsA):
        for j, p2 in enumerate(pixelsB):
            if i != j:
                distance_xy = p1.position - p2.position
                d = math.sqrt(sum([n**2 for n in distance_xy]))
                if 0 < d < 80:
                    force = g * 1 / d
                    unified = distance_xy / d
                    accel = unified * force
                    p1.vel += accel
        p1.position += p1.vel * 0.5
        if p1.position[0] >= width or p1.position[0] < 0:
            p1.vel[0] *= -1
        if p1.position[1] >= height or p1.position[1] < 0:
            p1.vel[1] *= -1


pixels1 = createPixels(20, 20, "#673AB7")
pixels2 = createPixels(20, 20, "#C62828")

while 1:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            sys.exit()

    gravity(pixels1, pixels1, -0.1)
    gravity(pixels1, pixels2, -0.1)
    gravity(pixels2, pixels1, 1)

    screen.fill("#121212")
    drawPixels(pixels1)
    drawPixels(pixels2)
    pygame.display.flip()
