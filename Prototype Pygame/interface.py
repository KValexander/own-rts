# Including pygame library
import pygame

# Connecting files
from configs import *
from arrays import *
from collisions import *

# Button class
class Button:
	def __init__(self, text, colorT, x, y, w, h, colorB):
		self.text = text
		self.colorT = colorT
		self.x = x
		self.y = y
		self.width = w
		self.height = h
		self.colorB = colorB
		self.font = pygame.font.SysFont("arial", 20)
		self.tW, self.tH = self.font.size(self.text)
		self.location = (self.x + self.width / 2 - self.tW / 2, self.y + self.height / 2 - self.tH / 2)
		self.rect = pygame.Rect(self.x, self.y, self.width, self.height)
		self.name = self.font.render(str(self.text), True, self.colorT)

	def draw(self, screen):
		pygame.draw.rect(screen, self.colorB, self.rect, 0)
		screen.blit(self.name, self.location)

# Interface class
class Interface:
	def __init__(self):
		self.create()

	def createButton(self, text, colorT, x, y, w, h, colorB):
		button = Button(text, colorT, x, y, w, h, colorB)
		buttons.append(button)

	def create(self):
		self.createButton("Кнопка", WHITE, 16, 16, 160, 32, BLACK)

	def draw(self, screen):
		for button in buttons:
			button.draw(screen)

	def update(self):
		pass