# Including pygame library
import pygame

# Connect files
from configs import *

# Template for units
class Unit():

	def update(self):
		self.movement()

	def draw(self, screen):
		screen.blit(self.image, self.rect)

	def movement(self):
		if(self.rect.x < self.move[0]): self.rect.x += self.speed
		if(self.rect.x > self.move[0]): self.rect.x -= self.speed
		if(self.rect.y < self.move[1]): self.rect.y += self.speed
		if(self.rect.y > self.move[1]): self.rect.y -= self.speed


class Worker(Unit):
	def __init__(self, ident,  x, y):
		# pygame.sprite.Sprite.__init__(self)

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
		# self.move 			= [x - self.width / 2, y - self.height / 2]
		self.move 			= [100, 100]

		# Group characteristic
		self.image 			= pygame.image.load(self.src)
		self.rect 			= self.image.get_rect()
		self.rect.center 	= (x, y)
