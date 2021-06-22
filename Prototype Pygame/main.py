# Including pygame library
import pygame

# Connect files
from configs import *
from arrays import *
from collisions import *

# Connect classes
from methods import Mouse
from methods import Key
from methods import Cash
from methods import Grid
from methods import SelectionRect


# Main class
class Main:
	# Init class
	def __init__(self):
		pygame.init();

		# Screen
		self.screen = pygame.display.set_mode(SIZE)
		pygame.display.set_caption("Storm of Wars")

		# For ID
		self.counter = 1

		# Gameloop speed
		self.clock = pygame.time.Clock()
		# State gameloop
		self.running = True

		# Loading elements
		self.loading()

	# Creating elements before start
	def loading(self):
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
				self.mouse.mouseDown(event)
				# State selection rectangle
				if(event.button == 1):
					self.selectionRect.state = True
				# Adding worker in array
				if(event.button == 2):
					addItem("worker", self.counter, self.mouse.clickX, self.mouse.clickY)
					self.counter += 1

			# Mouse up
			if event.type == pygame.MOUSEBUTTONUP:
				self.mouse.mouseUp(event)
				if(event.button == 1):
					# Select items
					self.selectionRect.selection()

			# Mouse move
			if event.type == pygame.MOUSEMOTION:
				self.mouse.mouseMove(event)

	# Intermediant calculation
	def update(self):
		# Gameloop speed
		self.clock.tick(FPS)

		# Update items data
		for item in items:
			item.update(items)

		# Updating item selection rectangle data 
		if self.selectionRect.state == True:
			self.selectionRect.update(self.mouse.coordClick, self.mouse.coordMove)
			self.selectionRect.ghostSelection(self.screen)

		# Handling events
		self.events()

	# Rendering
	def render(self):
		# Background color
		self.screen.fill(BLACK)

		# Rendering grid
		self.grid.drawGrid(self.screen)

		# Rendering items
		for item in items:
			item.draw(self.screen)
			
		# Rendering item selection rectangle 
		if self.selectionRect.state == True:
			self.selectionRect.draw(self.screen)

		# Clear past render
		pygame.display.flip()

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