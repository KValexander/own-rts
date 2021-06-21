# Including pygame library
import pygame

# Connect files
from configs import *

# Connect classes
from methods import Collision
from methods import Mouse
from methods import Key
from methods import Cash
from methods import Grid
from methods import SelectionRect

# from templates import Unit
from templates import Worker

# Main class
class Main:
	# Init class
	def __init__(self):
		pygame.init();

		# Screen
		self.screen = pygame.display.set_mode(SIZE)
		pygame.display.set_caption("Storm of Wars")

		# Groups
		# self.items = pygame.sprite.Group()
		self.items = []
		self.selectedItem = pygame.sprite.Group()
		self.buttons = pygame.sprite.Group()

		self.counter = 1

		# Gameloop speed
		self.clock = pygame.time.Clock()
		# State gameloop
		self.running = True

		# Loading elements
		self.loading()

	# Creating elements before start
	def loading(self):
		self.collision = Collision() # Collision
		self.mouse 	   = Mouse() 	 # Mouse
		self.key 	   = Key() 	  	 # Keys
		self.cash 	   = Cash() 	 # Cash
		self.grid 	   = Grid() 	 # Grid
		
		self.selectionRect = SelectionRect() # Selection Rect

		# Load background image
		# self.bg = pygame.image.load("images/map.jpg")
		# self.bg = pygame.transform.scale(self.bg, SIZE)

		self.start()

	# Start playing
	def start(self):
		self.running = True
		self.loop()

	# Handling events
	def events(self):
		# Event handling
		for event in pygame.event.get():
			# Quitting the game
			if event.type == pygame.QUIT: self.running = False

			# Key down
			if event.type == pygame.KEYDOWN:
				self.key.keyDown(event)

			# Mouse down
			if event.type == pygame.MOUSEBUTTONDOWN:
				self.mouse.mouseDown(event, self.selectionRect)
				if(event.button == 2):
					self.addItem("worker", self.mouse.clickX, self.mouse.clickY)

			# Mouse up
			if event.type == pygame.MOUSEBUTTONUP:
				self.mouse.mouseUp(event, self.selectionRect)

			# Mouse move
			if event.type == pygame.MOUSEMOTION:
				self.mouse.mouseMove(event)

	# Intermediant calculation
	def update(self):
		# Gameloop speed
		self.clock.tick(FPS)

		# Update data items
		# self.items.update()

		# Updating item selection rectangle data 
		if self.selectionRect.state == True:
			self.selectionRect.update(self.mouse.coordClick, self.mouse.coordMove)

		# Handling events
		self.events()

	# Rendering
	def render(self):
		# Background color
		self.screen.fill(BLACK)

		# Rendering grid
		self.grid.drawGrid(self.screen)

		# Rendering items
		# self.items.draw(self.screen)
		for val in self.items:
			val.draw(self.screen)
			
		# Rendering item selection rectangle 
		if self.selectionRect.state == True:
			self.selectionRect.draw(self.screen)
		# pygame.draw.rect(self.screen, GREEN, [self.grid.gridSize(self.mouse.moveX, "x"), self.grid.gridSize(self.mouse.moveY, "y"), 16, 16])

		# Clear past render
		pygame.display.flip()

	# Adding item
	def addItem(self, t, x, y):
		if(t == "worker"):
			item = Worker(self.counter, x, y)
		self.items.append(item)

		self.counter += 1

	# Gameloop
	def loop(self):
		# Gameloop
		while self.running:
			# Intermediant calculation
			self.update()

			# Rendering
			self.render()

Main()
pygame.quit()