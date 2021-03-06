"use strict";

const example1 = document.getElementById('node examples')
const example2 = document.getElementById('connection examples')
const example3 = document.getElementById('Different Node modifications')
const example4 = document.getElementById('Different Connection modifications')
const example5 = document.getElementById('Draggability setting')
const example6 = document.getElementById('Action Listener examples')
const bigExample = document.getElementById('big example')

const graph1 = new Graphybara()
graph1.setGraphSize(1000, 150)
graph1.addCircleNode("circle", "red", "circle", 100, 75, 50)
graph1.addEllipseNode("ellipse", "green", "ellipse", 250, 75, 75, 25)
graph1.addRectangleNode("rect", "blue", "", 400, 75, 125, 50)
graph1.addExtrapolatedGraph("extra", "orange", "", 550, 75, 125, 50)
const hexagon = document.createElementNS("http://www.w3.org/2000/svg", 'polygon')
hexagon.setAttribute("points", "150,75 112,140 37,140 0,75 37,10 112,10")
graph1.addCustomNode("custom", "aqua", "", 800, 125, 300, 260, hexagon)
graph1.addGraph(example1)

const graph2 = new Graphybara()
graph2.setGraphSize(400, 500)
graph2.addCircleNode("circle1", "red", "circle1", 100, 50, 50)
graph2.addCircleNode("circle2", "red", "circle2", 100, 400, 50)
graph2.addCircleNode("circle3", "red", "circle3", 300, 225, 50)
graph2.addConnection("con1", "con1", "circle1", "circle2", "nodirection", "green", graph2.bottom, graph2.top)
graph2.addLConnection("con2", "con2", "circle1", "circle3", "onedirection", "green", graph2.right, graph2.top)
graph2.addZConnection("con3", "con3", "circle3", "circle2", "bidirection", "green", graph2.left, graph2.right)
graph2.addCurvedConnection("con4", "con4", "circle3", "circle2", "bidirection", "green", graph2.bottom, graph2.bottom)
graph2.addGraph(example2)

const graph3 = new Graphybara()
graph3.setGraphSize(700, 150)

graph3.addCircleNode("circle1", "red", "circle1", 100, 75, 50)
graph3.setNodeColor("circle1", "SteelBlue")

graph3.addCircleNode("circle2", "blue", "circle2", 200, 75, 50)
graph3.setNodeStroke("circle2", 3, "black")

graph3.addCircleNode("circle3", "green", "circle3", 300, 75, 50)
graph3.setNodeTextColor("circle3", "orange")

graph3.addCircleNode("circle4", "orange", "circle4", 400, 75, 50)
graph3.setNodeText("circle4", "changed")

graph3.addCircleNode("circle5", "maroon", "circle5", 500, 75, 50)
graph3.setNodePosition("circle5", 550, 75)
graph3.addGraph(example3)

const graph4 = new Graphybara()
graph4.setGraphSize(400, 500)
graph4.addCircleNode("circle1", "red", "circle1", 100, 50, 50)
graph4.addCircleNode("circle2", "red", "circle2", 100, 400, 50)
graph4.addCircleNode("circle3", "red", "circle3", 300, 225, 50)
graph4.addConnection("con1", "con1", "circle1", "circle2", "nodirection", "green", graph2.bottom, graph2.top)
graph4.setConnectionLabel("con1", "changed")

graph4.addLConnection("con2", "con2", "circle1", "circle3", "onedirection", "green", graph2.right, graph2.top)
graph4.setConnectionColor("con2", "Violet")

graph4.addZConnection("con3", "con3", "circle3", "circle2", "bidirection", "green", graph2.left, graph2.right)
graph4.setConnectionArrowColor("con3", "red")
graph4.addGraph(example4)

const graph5 = new Graphybara()
graph5.setGraphSize(400, 500)
graph5.addCircleNode("circle1", "red", "drag me", 100, 50, 50)
graph5.addCircleNode("circle2", "red", "don't drag", 300, 400, 50)
graph5.addLConnection("con2", "", "circle1", "circle2", "onedirection", "green", graph2.right, graph2.top)

graph5.setNodeDraggable("circle1", true)
graph5.addGraph(example5)

const graph6 = new Graphybara()
graph6.setGraphSize(200, 500)
graph6.addCircleNode("circle1", "red", "click me", 100, 50, 50)
graph6.addCircleNode("circle2", "red", "don't click", 100, 400, 50)
graph6.addConnection("con1", "click me", "circle1", "circle2", "nodirection", "green", graph2.bottom, graph2.top)

function example(event){
  alert("You clicked the clickable!")
}
graph6.addEventListenerToNode("circle1", "click", example)
graph6.addEventListenerToConnection("con1", "click", example)
graph6.addGraph(example6)



const svg = new Graphybara()
// All graphs and connections have name strings used to identify them,
// This is super intuitive
svg.setGraphSize(1000, 500) //creating the graph
svg.addCircleNode("first", "yellow", "haha", 125*2, 150*2, 40*2) //adding a circular node
svg.setNodeColor("first", "blue") //changing its color
svg.setNodeStroke("first", 3, "black") //setting a stroke
svg.setNodeDraggable("first", true) //making it draggable
svg.addCircleNode("second", "yellow", "haha", 50*2, 50*2, 20*2) //similar as previous with different features
svg.setNodeStroke("second", 3, "blue")
svg.setNodeDraggable("second", true)
svg.addCircleNode("third", "brown", "haha", 180*2, 50*2, 20*2)
svg.addEllipseNode("420", "brown", "haha", 180*2, 50*2, 40, 20) //similar as previous but not draggable
svg.removeNode("420")
svg.setNodeStroke("third", 3, "red")
svg.setNodeDraggable("third", true)
svg.addRectangleNode("rect", "aqua", "haha", 200*2, 200*2, 80*2, 40*2) //adding a circular node
svg.addExtrapolatedGraph("extragraph", "aqua", "", 200, 200, 300, 150)
svg.setNodeDraggable("extragraph", true)
svg.setNodeDraggable("rect", true)

svg.setNodeTextColor("first", "red")

svg.addConnection("one", "lol", "second", "first", "bidirection", "red", svg.right, svg.left) //adding a connection both ways
svg.addCurvedConnection("two", "lol", "second", "third", "nodirection", "green", svg.right, svg.top) //adding a connection no way
svg.addConnection("three", "lol", "first", "third", "onedirection", "purple", svg.right, svg.left) //adding a connection one way
svg.addZConnection("four", "lol", "third", "rect", "bidirection", "green", svg.right, svg.left) // adding a connection to the rectangle
svg.addConnection("five", "lol", "second", "first", "onedirection", "green", svg.right, svg.left) //adding a connection no way
svg.setConnectionArrowColor("four", "red")
svg.setConnectionLabel("four", "great")
svg.addGraph(bigExample)
