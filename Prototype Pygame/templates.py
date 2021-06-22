# Including pygame library
import pygame

# Connect files
from configs import *
from arrays import *
from collisions import *

# Template for units
class Unit():

	# Update
	def update(self, items):
		self.movement()
		self.collisions(items)

	# Draw
	def draw(self, screen):
		screen.blit(self.image, self.rect)

		if(self.selected == True):
			self.drawSelection(screen)

	# Draw selection rectangle
	def drawSelection(self, screen):
		pygame.draw.rect(screen, GREEN, [self.rect.x, self.rect.y, self.rect.width, self.rect.height], 2)

	# Set motion coordinates
	def setMove(self, x, y):
		self.move = [x, y]
		self.action = "move"

	# Movement
	def movement(self):
		if(self.action != "move"): return 0

		if(self.rect.x == self.move[0] and self.rect.y == self.move[0]):
			return self.stopMove()

		if(self.rect.x < self.move[0]): self.rect.x += self.speed
		if(self.rect.x > self.move[0]): self.rect.x -= self.speed
		if(self.rect.y < self.move[1]): self.rect.y += self.speed
		if(self.rect.y > self.move[1]): self.rect.y -= self.speed

	# Stop motion
	def stopMove(self):
		self.action = "stand"
		self.move = [0, 0]

	# Handling collisions
	def collisions(self, items):
		# return 0
		for item in items:
			# Handling collisions with each other
			if itemCollision(self, item):
				dX = self.cX - item.cX
				dY = self.cY - item.cY
				if(dX > 0): self.rect.x += self.speed
				if(dX < 0): self.rect.x -= self.speed
				if(dY > 0): self.rect.y += self.speed
				if(dY < 0): self.rect.y -= self.speed


class Worker(Unit):
	def __init__(self, ident,  x, y):

		# Default characteristics
		self.typeItem 		= "unit"
		self.animationIndex = 0
		self.direction 		= 0
		self.directions 	= 8
		self.speed 			= 2
		self.target 		= 0
		self.action 		= "stand"
		self.selected 		= False
		self.selectable 	= True

		# Unique characteristics
		self.id 			= ident
		self.src 			= "images/worker.png"
		self.name 			= "Worker"
		self.iname 			= "Рабочий"
		self.description 	= "Усердный работяга"
		self.width 			= 16
		self.height 		= 24
		self.gridWidth 		= 1
		self.gridHeight 	= 1
		self.damage 		= [5, 7]
		self.defense 		= 1
		self.radius			= 10
		self.sight 			= 32
		self.level 			= 1
		self.maxLevel 		= 1
		self.experiense 	= 0
		self.maxExperiense 	= 0
		self.cost 			= [50, 0, 0, 1]
		self.frames 		= []
		self.move 			= [0, 0]

		# Group characteristic
		self.image 			= pygame.image.load(self.src)
		self.rect 			= self.image.get_rect()
		self.rect.center 	= (x, y)

		# Collisions characteristic
		self.cX = self.rect.x + self.rect.width / 2
		self.cY = self.rect.y + self.rect.height / 2
