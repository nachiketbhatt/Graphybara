# Graphybara.js

A lightweight but powerful graph making library for making versatile and colorful graphs written in vanilla JavaScript and without the use of HTMLCanvas and only using SVGs.  
The GitHub repository is on the top right of the page. Click on it to contribute or view the code :)  

Examples of the library in action can be found below in this [link](https://salty-wildwood-18861.herokuapp.com/example.html).

## Getting started
To use the library in your project, get a copy of *Graphybara.js* on your machine
and insert the following line inside your <head> tag in your HTML file like below:
```html
<head>
  <script defer type="text/javascript" src='Graphybara.js'></script>
</head>
```
Replace *'Graphybara.js'* with the path to it from the HTML file.

## Operations and functions

### Creating a new graph

Start by instantiating a new Graphybara object:
```javascript
const graph = new Graphybara()
```
This new object can then be used to add new graph nodes and connect them.  
The function *setGraphSize* allows us to set the dimension of our graph. This is a ***mandatory***
step before we can add or remove anything to the graph.
```javascript
setGraphSize(width, height)

//Example:
graph.setGraphSize(1000, 1000)
```
After this, you are good to go and can add new nodes and connections to this graph.

### Adding new graph nodes
This library allows you to add a variety of nodes using the functions listed below.  
The following parameters are common in every graph node and you must understand their
purpose before proceeding:

* **name (important)**: A string. The name attribute is used to reference any specific node in the graph. This means you have to be sure to give *unique* names to each new node you add and their names cannot be similar to any previous node you added. Once you remove a node of a specific name, you may add another node with the same name.
* **color**: A string. The color of the node
* **center_x**: An integer. The x coordinate of the center point of the node. Used to specify the location of the node in the graph.
* **center_y**: An integer. The y coordinate of the center point of the node. Used to specify the location of the node in the graph.
* **text**: A string. The text to be displayed in the center of the node as a label on the node. Keep empty if you don't want to have any text.

#### addCircleNode
This function allows you to add a circular node with a specific radius into your graph.  
New parameters:  
* **radius**: An integer. The radius of the new circular node.  

```javascript
addCircleNode(name, color, text, center_x, center_y, radius)

//Example:
graph.addCircleNode("First", "yellow", "My first", 250, 250, 80)
```

#### addEllipseNode
This function allows you to add elliptical nodes with a specific radii for the x and y axes.  
New parameters:  
* **radius_x**: An integer. The x-axis radius for the ellipse.
* **radius_y**: An integer. The y-axis radius for the ellipse.


```javascript
addEllipseNode(name, color, text, center_x, center_y, radius_x, radius_y)

//Example:
graph.addEllipseNode("Second", "brown", "My Second", 100, 150, 40, 20)
```

#### addRectangleNode
This function allows you to add a rectangular node with a specific width and height.
New parameters:  
* **width**: An integer. The width of the rectangular node
* **height**: An integer. The height of the rectangular node

```javascript
addRectangleNode(name, color, text, center_x, center_y, width, height)

//Example
graph.addRectangleNode("rectangle", "aqua", "My third", 400, 400, 160, 80)
```

####   addExtrapolatedGraph
This function allows you to add a node which represents multiple nodes which we want to make abstract.
An image of what we are aiming for:  
![Extrapolated Graph example 1](./extrapolated_graph_example1.png)![Extrapolated Graph example 2](./extrapolated_graph_example2.png)  
Parameters are same as *addRectangleNode*.

```javascript
addExtrapolatedGraph(name, color, text, center_x, center_y, width, height)

//Example
graph.addExtrapolatedGraph("extragraph", "aqua", "First extrapolated graphs", 200, 200, 300, 150)
```

#### addCustomNode
This function allows you to create your own SVG elements and use them as a node.  
The parameters are the same as *addRectangleNode* except one:  
* **svgElement**: This a DOM element. It should be an SVG DOM element to directly use as a shape. It is recommended to use the basic SVG shapes like polygon, polypath, path etc. For best results, make sure that the element can be written in a single HTML tag.
* **center_x**, **center_y**, **width**, **height**: Provide the best estimate for these values you have given your custom shape. Many operations depend on these values. Tweak them until the behavior is as desired.

```javascript
addCustomNode(name, color, text, center_x, center_y, width, height, svgElement)

//Example
const hexagon = document.createElementNS("http://www.w3.org/2000/svg", 'polygon')
hexagon.setAttribute("points", "300,150 225,280 75,280 0,150 75,20 225,20")
graph.addCustomNode("custom", "red", "Custom", 150, 150, 300, 260, hexagon)
```

### Changing properties of nodes
Nodes as objects have a lot of properties we can change. This includes their draggability, color, stroke, text color and position.

#### setNodeDraggable
This function allows us to specify, given the unique node name, whether it is draggable by the end user or not.  
Parameters:  
* **name**: The unique node name
* **draggable**: A boolean. Specifying whether or not the node can be dragged.

```javascript
setNodeDraggable(name, draggable)

//Example
graph.setNodeDraggable("custom", true)
```

#### setNodeColor
This function allows us to change the color of the node.
Parameters:  
* **name**: The unique node name
* **color**: A string. Specifying the new color of the node.

```javascript
setNodeColor(name, color)

//Example
graph.setNodeColor("custom", "blue")
```

#### setNodeStroke
This function allows us to change the color and width of the boder of a node.
Parameters:  
* **name**: The unique node name
* **strokewidth**: An integer. Specifying the new width of the border.
* **strokecolor**: A string. Specifying the new color of the border

```javascript
setNodeStroke(name, strokewidth, strokecolor)

//Example
graph.setNodeStroke("custom", 3, "red")
```

#### setNodeText
This function allows us to change the text inside the node.
Parameters:
* **name**: The unique node name
* **text**: A string. The new text.

```javascript
setNodeText(name, text)

//Example
svg.setNodeText("custom", "haha")
```

#### setNodeTextColor
This function allows us to change the color of the text inside the node.
Parameters:
* **name**: The unique node name
* **color**: A string. The new color of the text.

```javascript
setNodeTextColor(name, color)

//Example
graph.setNodeTextColor("custom", "blue")
```

#### setNodePosition
This function allows us to change the center position of the node
Parameters:
* **name**: The unique node name
* **new_x**: An integer. The new x coordinate of the center.
* **new_y**: An integer. The new y coordinate of the center.

```javascript
setNodePosition(name, new_x, new_y)

//Example
graph.setNodePosition("custom", 160, 160)
```

#### addEventListenerToNode
This function allows us to add new event listeners with custom callback functions to the node.  
All event listeners are allowed except **"mousedown"**. This event listener is important for other functions.
Parameters:
* **name**: The unique node name
* **event**: A string. Specifying the event to listen for.
* **callbackFunction**: A function. The function to be called when the event is listened.

```javascript
addEventListenerToNode(name, event, callbackFunction)

//Example
graph.addEventListenerToNode("custom", "dblclick", (evt) => {console.log("Custom was double clicked on.")})
```

#### removeEventListenerFromNode
This function allows us to remove event listeners from a node except **"mousedown"**. This event listener is important for other functions.
* **name**: The unique node name
* **event**: A string. Specifying the event to remove.
* **callbackFunction**: A function. The function to be removed. Should not be anonymous and must have the same name as when the listener was added.

```javascript
removeEventListenerFromNode(name, event, callbackFunction)

//Example
function example(evt){
  console.log("Custom was double clicked on.")
}
graph.addEventListenerToNode("custom", "dblclick", example)
graph.removeEventListenerFromNode("custom", "dblclick", example)
```

#### removeNode
This function removes the node and all its connections/edges given a name.
* **name**: A string. The unique name of the node which we want to remove

```javascript
removeNode(name)

//Example
graph.removeNode("custom")
```

### Connecting nodes
Now that we know how to manipulate nodes, we can now proceed to connecting them.  
We connect two nodes by adding a new connection to the graph using different
functions to add different types of connections.  
All the different functions to add a new connection have the same parameters. They are as follows:  
name, label, from, to, type, color, fromborder, toborder
* **name(important)**: A string. This string will be used to reference a specific connection. Same as with the nodes, this name parameter should be unique for every connection. The same name parameter can be used for a different connection only if the previous connection is removed.
* **label**: A string. The label which will be displayed on the line of the connection.
* **from**: A string. The unique string referencing the node from where the connection originates
* **to**: A string. The unique string referencing the node to where the connection ends
* **type**: A string. Can be either "nodirection"(no arrowheads), "onedirection"(one arrowhead pointing towards the 'to' node) or "bidirection"(two arrowheads, each pointing towards the 'from' and 'to' nodes)
* **color**: A string. The color of the line connecting the two nodes.
* **fromborder(important)**: An integer. This parameter specifies from which side of the 'from' node the connection will originate. That is, it tells us whether the connection originates from the top, bottom, left or right side of the 'from' node. To specify this parameter, it is recommended you use constants inside the instantiated graph object. For example, if we want to specify 'top', use *graph.top* for this parameter. Similarly you can specify *graph.bottom*, *graph.left* and *graph.right*.
* **toborder(important)**: An integer. This parameter specifies to which side of the 'to' node the connection will end. That is, it tells us whether the connection ends at the top, bottom, left or right side of the 'to' node. To specify this parameter, it is recommended you use constants inside the instantiated graph object. For example, if we want to specify 'top', use *graph.top* for this parameter. Similarly you can specify *graph.bottom*, *graph.left* and *graph.right*.

#### addConnection
Using the parameters as described above, this function connects two nodes using a straight line.
![Straight line example](./stright_line_example.png)
```javascript
addConnection(name, label, from, to, type, color, fromborder, toborder)

//Example
graph.addConnection("one", "first to second", "first", "second", "bidirection", "red", graph.right, graph.left)
```

#### addCurvedConnection
Using the parameters as described above, this function connects two nodes using a curved line.  
![Curved Example](./curved_example.png)
```javascript
addCurvedConnection(name, label, from, to, type, color, fromborder, toborder)

//Example
graph.addCurvedConnection("two", "first to second", "first", "second", "onedirection", "blue", graph.right, graph.top)
```

#### addLConnection
Using the parameters as described above, this function connects two nodes using a an L shaped line.
![L shape example](./l_shaped_example.png)
```javascript
addLConnection(name, label, from, to, type, color, fromborder, toborder)

//Example
graph.addLConnection("one", "first to second", "first", "second", "bidirection", "red", graph.right, graph.top)
```

#### addZConnection
Using the parameters as described above, this function connects two nodes using a Z shaped line.  
![Z shaped example](./z_shape_example.png)
```javascript
addZConnection(name, label, from, to, type, color, fromborder, toborder)

//Example
graph.addZConnection("one", "first to second", "first", "second", "bidirection", "red", graph.right, graph.left)
```

### Changing properties of nodes
Similar to nodes, there are important properties of a connection you can customize.

#### removeConnection
This function allows us to remove a connection given the unique connection name.  
Parameters:
* **name**: The unique name of the connection.

```javascript
removeConnection(name)

//Example
graph.removeConnection("one")
```

#### setConnectionColor
This function allows us to change the color of the connection given a name.  
Parameters:  
* **name**: The unique name of the connection.
* **color**: A string. The new color of the connection

```javascript
setConnectionColor(name, color)

//Example
graph.setConnectionColor("first to second", "aqua")
```

#### setConnectionArrowColor
This function allows us to change the color of the arrowheads of the connection given a name.  
Parameters:
* **name**: The unique name of the connection.
* **color**: A string. The new color of the arrowheads

```javascript
setConnectionArrowColor(name, color)

//Example
graph.setConnectionArrowColor("first to second", "red")
```

#### setConnectionLabel
This function allows us to change the label of the connection given a name.  
Parameters:
* **name**: The unique name of the connection.
* **label**: A string. The new label of the connection

```javascript
setConnectionLabel(name, label)

//Example
graph.setConnectionLabel("first to second", "label changed")
```

#### addEventListenerToConnection
Add an event listener to the connection.  
Parameters:
* **name**: The unique connection name
* **event**: A string. Specifying the event to listen for.
* **callbackFunction**: A function. The function to be called when the event is listened.

```javascript
addEventListenerToConnection(name, event, callbackFunction)

//Example
graph.addEventListenerToConnection("first to second", "click", (event)=>{console.log("first to second was clicked")})
```

#### removeEventListenerFromConnection
Remove an event listener from the conenction.
* **name**: The unique connection name
* **event**: A string. Specifying the event to remove.
* **callbackFunction**: A function. The function to be removed which was paired with the event.

* **name**: The unique node name
* **event**: A string. Specifying the event to remove.
* **callbackFunction**: A function. The function to be removed. Should not be anonymous and must have the same name as when the listener was added.

```javascript
removeEventListenerFromConnection(name, event, callbackFunction)

//Example
function example(evt){
  console.log("first to second was clicked")
}
graph.addEventListenerToConnection("first to second", "click", example)
graph.removeEventListenerFromConnection("first to second", "click", example)
```

### clear
Any instantiated graph can be wiped clean using the *clear* function. All nodes, connections will be removed.

```javascript
graph.clean()
```

### Displaying your graph
Now that we have created our graph, to display it we will use the *addGraph* function. In the parameter, you pass in the DOM element you want the graph to be a child of. And then, it will be displayed.
```javascript
const body = document.querySelector('body') //replace with any DOM element which can house children
graph.addGraph(body)
```

### Future plans

#### Animations
This is currently a work under progress. We plan to add a function to animate the whole graph given a list of animations and their durations. These animations may loop for a set number of iterations or infinitely.  
If you are interested, have a look at repository and see how you can contribute.
