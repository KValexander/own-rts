# Including pygame library
import pygame

# Connect files
from configs import *

# Template for units
class Unit:
	def __init__(self):
		# Default characteristics
		self.typeItem 		= "unit"
		self.animationIndex = 0
		self.direction 		= 0
		self.directions 	= 8
		self.speed 			= 0
		self.move 			= ()
		self.target 		= null
		self.action 		= "stand"
		self.selected 		= False
		self.selectable 	= True

		# Unique characteristics
		self.src 			= ""
		self.name 			= ""
		self.iname 			= ""
		self.description 	= ""
		self.width 			= 0
		self.sight 			= 0
		self.level 			= 0
		self.height 		= 0
		self.defense 		= 0
		self.radiuse 		= 0
		self.hitPoints 		= 0
		self.gridWidth 		= 0
		self.experiense 	= 0
		self.gridHeight 	= 0
		self.maxExperiense	= 0
		self.cost 			= []
		self.damage 		= []
		self.frames 		= []

class Worker(Unit):
	def __init__(self):
		self.src 			= "images/worker.png"
		self.name 			= "Worker"
		self.iname 			= "Рабочий"
		self.description 	= "Рабочий усердно работает"
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