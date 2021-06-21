# Including pygame library
import pygame

# Connect files
from configs import *

# Collision class
class Collision:
	# Handling mouse collision
	def mouseCollision(self, item, mousePos):
		x, y = mousePos
		if( item.x < x and (item.x + item.width) > x
			or item.x < y and (item.y + item.height ) > y):
			return true
		else: return false

# Mouse class
class Mouse:
	def __init__(self):
		self.coordClick = 0
		self.clickX = 0
		self.clickY = 0

		self.coordMove 	= 0
		self.moveX = 0
		self.moveY = 0

	# Handling mouse click
	def mouseClick(self, e):
		self.clickX, self.clickY = e.pos
		self.coordClick = e.pos
		print(self.coordClick)

	# Handling mouse move
	def mouseMove(self, e):
		self.moveX, self.moveY = e.pos
		self.coordMove = e.pos
		print(self.coordMove)

# Keys class
class Key:
	def __init__(self):
		self.code = 0

	# Handling key down
	def keyDown(self, e):
		self.code = e.key
		print(e.key)

# Cash class
class Cash:
	def __init__(self):
		self.gold 	= 0
		self.wood 	= 0
		self.metal 	= 0
		self.food 	= 0

	# Set Cash
	def setCash(self, gold, wood, metal, food):
		self.gold 	= gold
		self.wood	= wood
		self.metal 	= metal
		self.food 	= food

	# Give Cash
	def giveCash(self, gold, wood, metal, food):
		self.gold 	+= gold
		self.wood 	+= wood
		self.metal 	+= metal
		self.food 	+= food


# Grid class
class Grid:
	def __init__(self):
		self.color 	= BLACK
		self.i 		= 0
		self.lineX 	= 16
		self.lineY 	= 16
		self.collsX = WIDTH / self.lineX
		self.collsY = HEIGHT / self.lineY

	# Casting numbers to multiples of the grid
	def gridSize(self, n, t):
		if t == "x": n = int(n / self.lineX) * self.lineX
		if t == "y": n = int(n / self.lineY) * self.lineY
		return n

	# Method grid rendering
	def drawGrid(self, screen):
		while self.i < self.collsX * self.lineX:
			pygame.draw.line(screen, self.color, (self.i, 0), (self.i, WIDTH))
			self.i += self.lineX
		self.i = 0
		while self.i < self.collsY * self.lineY:
			pygame.draw.line(screen, self.color, (0, self.i), (HEIGHT, self.i))
			self.i += self.lineY
		self.i = 0
		
# Camera class
class Camera:
	def __init__(self):
		self.x 		= 0
		self.y 		= 0
		self.width 	= 0
		self.height = 0
		self.state 	= True
		self.scale 	= 1