# Including pygame library
import pygame

# Connect files
from configs import *

# Main class
class Main:
	# Init class
	def __init__(self):
		pygame.init();

		# Screen
		self.screen = pygame.display.set_mode(SIZE)
		pygame.display.set_caption("Storm of Wars")

		# Groups
		self.items = pygame.sprite.Group()
		self.selectedItem = pygame.sprite.Group()

		# Gameloop speed
		self.clock = pygame.time.Clock()
		# State gameloop
		self.running = True

		# Creating elements
		self.loading()

	# Creating elements before start
	def loading(self):
		# Mouse
		# Keys
		# Cash
		# Grid

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

	# Intermediant calculation
	def update(self):
		# Gameloop speed
		self.clock.tick(FPS)

		# Handling events
		self.events()

	# Rendering
	def render(self):
		# Background color
		self.screen.fill(WHITE)

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