# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Category.destroy_all
d = DateTime

cat1 = Category.new 
cat1.name = "First"
cat1.save 

cat2 = Category.new 
cat2.name = "Second"
cat2.save 

t1 = cat1.tasks.build 
t1.name = "Task1, Cat1"
t1.description = "Task1 description "
t1.due_date = DateTime.now
t1.save 

t2 = cat1.tasks.build
t2.name = "Task2, Cat1"
t2.description = "Buy laundry"
t2.due_date = DateTime.now + 9.days
t2.save 

t2_1 = cat2.tasks.build 
t2_1.name = "Task 1, Cat 2"
t2_1.description = "Once finished, update teammates and finalize plan"
t2_1.due_date = DateTime.now + 1.weeks
t2_1.save 

t2_2 = cat2.tasks.build 
t2_2.name = "Task 2, Cat 2"
t2_2.save