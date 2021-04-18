"use strict";

(function(global, document) {
console.log('----------')
console.log('SCRIPT: Creating and loading Graphybara.js')
function getMousePosition(evt) {
  return {
    x: (evt.clientX),
    y: (evt.clientY)
  };
}
const svglnk = "http://www.w3.org/2000/svg"
let lineid_count = 0

const top_num = 0
const bottom_num = 1
const left_num = 2
const right_num = 3

function Graphybara(){
	this.nodes = new Map()
	this.lines = new Map()
	this.graph = document.createElementNS(svglnk,"svg")
  this.top = top_num
  this.bottom = bottom_num
  this.left = left_num
  this.right = right_num
}

Graphybara.prototype = {
	setGraphSize: function(width, height){
		this.graph.setAttribute("width", `${width}`)
		this.graph.setAttribute("height", `${height}`)
	},
	addGraph: function(Parent) {
		Parent.appendChild(this.graph)
	},
	addCircleNode: function(name, color, text, center_x, center_y, radius){
		this.nodes.set(name, new CircleNode(color, text, center_x, center_y, radius))
		this.graph.appendChild(this.nodes.get(name).getNode())
	},
	addRectangleNode: function(name, color, text, center_x, center_y, width, height){
		this.nodes.set(name, new RectangleNode(color, text, center_x, center_y, width, height))
		this.graph.appendChild(this.nodes.get(name).getNode())
	},
  addExtrapolatedGraph: function(name, color, text, center_x, center_y, width, height){
    this.nodes.set(name, new ExtrapolatedGraph(color, text, center_x, center_y, width, height))
		this.graph.appendChild(this.nodes.get(name).getNode())
  },
  addEllipseNode: function(name, color, text, center_x, center_y, radius_x, radius_y){
    this.nodes.set(name, new EllipseNode(color, text, center_x, center_y, radius_x, radius_y))
		this.graph.appendChild(this.nodes.get(name).getNode())
  },
  addCustomNode: function(name, color, text, center_x, center_y, width, height, svgElement){
    this.nodes.set(name, new CustomNode(color, text, center_x, center_y, width, height, svgElement))
		this.graph.appendChild(this.nodes.get(name).getNode())
  },
	setNodeColor: function(name, color){
		this.nodes.get(name).setColor(color)
	},
	setNodeStroke: function(name, strokewidth, strokecolor){
		this.nodes.get(name).setStroke(strokewidth, strokecolor)
	},
	setNodeDraggable: function(name, draggable){
		this.nodes.get(name).setDraggable(draggable)
	},
  setNodeTextColor: function(name, color){
    this.nodes.get(name).setTextColor(color)
  },
  setNodePosition: function(name, new_x, new_y){
    this.nodes.get(name).move(new_x, new_y)
  },
  setNodeText: function(name, text){
    this.nodes.get(name).setText(text)
  },
	addConnection: function(name, label, from, to, type, color, fromborder, toborder){
		this.lines.set(name, new Line(name, label, this.nodes.get(from), this.nodes.get(to), type, color,fromborder, toborder))
		this.graph.prepend(this.lines.get(name).getConnection())
	},
  addCurvedConnection: function(name, label, from, to, type, color, fromborder, toborder){
		this.lines.set(name, new CurvedLine(name, label, this.nodes.get(from), this.nodes.get(to), type, color,fromborder, toborder))
		this.graph.prepend(this.lines.get(name).getConnection())
	},
  addLConnection: function(name, label, from, to, type, color, fromborder, toborder){
		this.lines.set(name, new LLine(name, label, this.nodes.get(from), this.nodes.get(to), type, color,fromborder, toborder))
		this.graph.prepend(this.lines.get(name).getConnection())
	},
  addZConnection: function(name, label, from, to, type, color, fromborder, toborder){
		this.lines.set(name, new ZLine(name, label, this.nodes.get(from), this.nodes.get(to), type, color,fromborder, toborder))
		this.graph.prepend(this.lines.get(name).getConnection())
	},
  setConnectionColor: function(name, color){
    this.lines.get(name).setColor(color)
  },
  setConnectionArrowColor: function(name, color){
    this.lines.get(name).setArrowColor(color)
  },
  setConnectionLabel: function(name, label){
      this.lines.get(name).setLabel(label)
  },
  addEventListenerToNode: function(name, event, callbackFunction){
    if (event !== "mousedown"){
      this.nodes.get(name).svg.addEventListener(event, callbackFunction)
    }else{
      log("Cannot change the mousedown event for nodes")
    }
  },
  addEventListenerToConnection: function(name, event, callbackFunction){
    this.lines.get(name).svg.addEventListener(event, callbackFunction)
  },
  removeEventListenerFromNode: function(name, event, callbackFunction){
    if (event !== "mousedown"){
      this.nodes.get(name).svg.removeEventListener(event, callbackFunction)
    }else{
      log("Cannot change the mousedown event for nodes")
    }
  },
  removeEventListenerFromConnection: function(name, event, callbackFunction){
    this.lines.get(name).svg.removeEventListener(event, callbackFunction)
  },
  removeNode: function(name){
    this.nodes.get(name).fromConnections.map(line=>{
      this.graph.removeChild(line.svg)
      this.lines.delete(line.name)
    })
    this.nodes.get(name).toConnections.map(line=>{
      this.graph.removeChild(line.svg)
      this.lines.delete(line.name)
    })
    this.graph.removeChild(this.nodes.get(name).svg)
    this.nodes.delete(name)
  },
  removeConnection: function(name){
    this.graph.removeChild(this.lines.get(name).svg)
    this.lines.delete(name)
  },
  addAnimations: function(name, listOfAnimations){
    // TODO:
    //add the animations to the "name" element.
    //Make sure the user has the correct animations
    //maybe check and use element.animate() docs
  },
  clear: function(){
    this.nodes = new Map()
    this.lines = new Map()
    this.graph.innerHTML = ``
    lineid_count = 0
  }
}

class _Node{
	constructor(color, text, center_x, center_y){
		this.fromConnections = []
		this.toConnections = []
		this.color = color
		this.text = text
		this.center_x = center_x
		this.center_y = center_y
    this.center_x_init = center_x
    this.center_y_init = center_y
		this.strokewidth = 0
		this.strokecolor = ""
		this.svg = document.createElementNS(svglnk, 'svg')
		this.svg.style.cursor = "default"
		this.element = null
		this.edgepoints = []

    this.labelElement = document.createElementNS(svglnk, 'text')
    const label = document.createTextNode(this.text)
    this.labelElement.appendChild(label)
    const labelwidth = parseFloat(this.labelElement.getAttribute("width"))
    const labelheight = parseFloat(this.labelElement.getAttribute("height"))
    this.labelElement.setAttribute("x",`${center_x - 3 * this.text.length}`)
    this.labelElement.setAttribute("y",`${center_y + 5}`)

		this.setDraggable = this.setDraggable.bind(this)
		this.setStroke = this.setStroke.bind(this)
		this.getNode = this.getNode.bind(this)
		this.setColor = this.setColor.bind(this)
		this.startDrag = this.startDrag.bind(this)
		this.drag = this.drag.bind(this)
		this.endDrag = this.endDrag.bind(this)

		this.draggable = false
		this.findEdgePoints = this.findEdgePoints.bind(this)

		this.svg.addEventListener('mousedown', this.startDrag)
		this.svg.setAttribute("x", "0");
		this.svg.setAttribute("y", "0");
    this.svg.appendChild(this.labelElement)
    this.fourSides = [{x:center_x, y:center_x},{x:center_x, y:center_x},{x:center_x, y:center_x},{x:center_x, y:center_x}]
	}

  setText(text){
    this.text = text
    this.labelElement.innerHTML = ``
    this.labelElement.setAttribute("x",`${this.center_x_init - 8 * this.text.length / 2}`)
    this.labelElement.setAttribute("y",`${this.center_y_init + 5}`)
    const label = document.createTextNode(this.text)
    this.labelElement.appendChild(label)
  }

  setTextColor(color){
    this.labelElement.style.fill = color
  }

	findEdgePoints(){
		return []
	}

	drag(event){
		event.preventDefault();
    let node = this.svg
    let coord = getMousePosition(event);
		let diff_x = parseInt(this.svg.getAttribute("x"))
		let diff_y = parseInt(this.svg.getAttribute("y"))
		node.setAttribute("x", `${coord.x - this._offset.x}`);
		node.setAttribute("y", `${coord.y - this._offset.y}`);
		diff_x -= parseInt(this.svg.getAttribute("x"))
		diff_y -= parseInt(this.svg.getAttribute("y"))
		this.center_x = this.center_x - diff_x
		this.center_y = this.center_y - diff_y
		this.edgepoints = this.findEdgePoints()
		for (let i = 0; i < this.fromConnections.length; i++){
			this.fromConnections[i].shiftFirstCoordinate(diff_x, diff_y)
		}
		for (let i = 0; i < this.toConnections.length; i++){
			this.toConnections[i].shiftSecondCoordinate(diff_x, diff_y)
		}
    for (let i = 0; i < this.fourSides.length; i++){
      this.fourSides[i].x -= diff_x
      this.fourSides[i].y -= diff_y
    }
	}

  move(new_x, new_y){
    let diff_x = this.center_x
		let diff_y = this.center_y
		this.svg.setAttribute("x", `${new_x - diff_x}`);
		this.svg.setAttribute("y", `${new_y - diff_y}`);
		diff_x -= parseInt(this.svg.getAttribute("x"))
		diff_y -= parseInt(this.svg.getAttribute("y"))
		this.center_x = this.center_x - diff_x
		this.center_y = this.center_y - diff_y
		this.edgepoints = this.findEdgePoints()
		for (let i = 0; i < this.fromConnections.length; i++){
			this.fromConnections[i].shiftFirstCoordinate(diff_x, diff_y)
		}
		for (let i = 0; i < this.toConnections.length; i++){
			this.toConnections[i].shiftSecondCoordinate(diff_x, diff_y)
		}
    for (let i = 0; i < this.fourSides.length; i++){
      this.fourSides[i].x -= diff_x
      this.fourSides[i].y -= diff_y
    }
  }

	endDrag(event){
		event.preventDefault();
    let node = event.target.parentNode
    node.removeEventListener('mousemove', this.drag);
		node.removeEventListener('mouseup', this.endDrag);
    //node.removeEventListener('mouseout', this.endDrag);
	}

	startDrag(event){
		event.preventDefault();
		if (this.draggable){
      let node = event.target.parentNode
			this._offset = getMousePosition(event);
			this._offset.x -= parseFloat(node.getAttribute("x"))
			this._offset.y -= parseFloat(node.getAttribute("y"))
			node.addEventListener('mousemove', this.drag)
      node.addEventListener('mouseup', this.endDrag);
      //node.addEventListener('mouseout', this.endDrag);
		}
	}

	setColor(color){
		this.element.setAttribute("fill", color)
	}

	setDraggable(draggable){
		if (draggable) {
			this.svg.style.cursor = "move"
		} else {
			this.svg.style.cursor = "default"
		}
		this.draggable = draggable
	}

	setStroke(strokewidth, strokecolor){
		this.strokewidth = strokewidth
		this.strokecolor = strokecolor
		this.element.setAttribute("stroke-width", `${strokewidth}`)
		this.element.setAttribute("stroke", strokecolor)
	}

	getNode(){
		return this.svg
	}
}

class CircleNode extends _Node {
	constructor(color, text, center_x, center_y, radius){
		super(color, text, center_x, center_y)
		this.element = document.createElementNS(svglnk, "circle")
		this.radius = radius
		this.element.setAttribute("cx", `${center_x}`)
		this.element.setAttribute("cy", `${center_y}`)
		this.element.setAttribute("r", `${radius}`)
		this.element.setAttribute("fill", color)
		this.svg.prepend(this.element)
    this.fourSides = [{x:center_x,y:center_y-radius},{x:center_x,y:center_y+radius},{x:center_x-radius,y:center_y},{x:center_x+radius,y:center_y}]
	}
}

class EllipseNode extends _Node {
	constructor(color, text, center_x, center_y, radius_x, radius_y){
		super(color, text, center_x, center_y)
		this.element = document.createElementNS(svglnk, "ellipse")
		this.radius_x = radius_x
    this.radius_y = radius_y
		this.element.setAttribute("cx", `${center_x}`)
		this.element.setAttribute("cy", `${center_y}`)
		this.element.setAttribute("rx", `${radius_x}`)
    this.element.setAttribute("ry", `${radius_y}`)
		this.element.setAttribute("fill", color)
		this.svg.prepend(this.element)
    this.fourSides = [{x:center_x,y:center_y-radius_y},{x:center_x,y:center_y+radius_y},{x:center_x-radius_x,y:center_y},{x:center_x+radius_x,y:center_y}]
	}
}

class RectangleNode extends _Node {
	constructor(color, text, center_x, center_y, width, height){
		super(color, text, center_x, center_y)
		this.element = document.createElementNS(svglnk, "rect")
		this.width = width
		this.height = height
		this.element.setAttribute("x", `${center_x - width/2}`)
		this.element.setAttribute("y", `${center_y - height/2}`)
		this.element.setAttribute("width", `${width}`)
		this.element.setAttribute("height", `${height}`)
		this.element.setAttribute("fill", color)
		this.svg.prepend(this.element)
    this.fourSides = [{x:center_x,y:center_y-height/2},{x:center_x,y:center_y+height/2},{x:center_x-width/2,y:center_y},{x:center_x+width/2,y:center_y}]
	}
}

class CustomNode extends _Node {
	constructor(color, text, center_x, center_y, width, height, svgElement){
		super(color, text, center_x, center_y)
		this.element = svgElement
    this.element.setAttribute("fill", color)
		this.width = width
		this.height = height
    this.svg.setAttribute("x", `${center_x - width/2}`)
    this.svg.setAttribute("y", `${center_y - height/2}`)
		this.svg.prepend(this.element)
    this.fourSides = [{x:center_x,y:center_y-height/2},{x:center_x,y:center_y+height/2},{x:center_x-width/2,y:center_y},{x:center_x+width/2,y:center_y}]
	}
}

class ExtrapolatedGraph extends _Node {
	constructor(color, text, center_x, center_y, width, height){
		super(color, text, center_x, center_y)
    this.svg.setAttribute("x", `${center_x - width/2}`)
    this.svg.setAttribute("y", `${center_y - height/2}`)
    let radius = 0
    let coordinates = []
    if (width > height){
      radius = width / 6
      coordinates = [{cx:radius, cy:height/2},
        {cx:width/3 + width / 12, cy:height/2},
        {cx:width/3 + 2 * width / 12, cy:height/2},
        {cx:width/3 + 3 * width / 12, cy:height/2},
        {cx:width - radius, cy:height/2}]
    } else{
      radius = height / 6
      coordinates = [{cx:width/2, cy:radius},
        {cx:width/2, cy:height/3 + height / 12},
        {cx:width/2, cy:height/3 + 2 * height / 12},
        {cx:width/2, cy:height/3 + 3 * height / 12},
        {cx:width/2, cy:height - radius}]
    }
    this.big_r = radius
    const radii = [radius, radius / 6, radius / 6, radius / 6, radius]
    this.labelElement.setAttribute("x",`${coordinates[2].cx - 8 * this.text.length / 2}`)
    this.labelElement.setAttribute("y",`${coordinates[2].cy - 5}`)
    this.circles = []
    for (let i=0;i < 5; i++){
      let element = document.createElementNS(svglnk, "circle")
      element.setAttribute("fill", color)
      element.setAttribute("cx", `${coordinates[i].cx}`)
      element.setAttribute("cy", `${coordinates[i].cy}`)
      element.setAttribute("r", `${radii[i]}`)
      this.svg.prepend(element)
      this.circles.push(element)
    }
    this.fourSides = [{x:center_x,y:center_y-height/2},{x:center_x,y:center_y+height/2},{x:center_x-radius/6-30,y:center_y},{x:center_x+radius/6+30,y:center_y}]
	}

  setColor(color){
		this.circles.map(elm => elm.setAttribute("fill", color))
	}

  setStroke(strokewidth, strokecolor){
		this.strokewidth = strokewidth
		this.strokecolor = strokecolor
    this.circles.map(elm => {
      elm.setAttribute("stroke-width", `${strokewidth}`)
  		elm.setAttribute("stroke", strokecolor)
    })
	}
}

class Line{
	constructor(name, label, from, to, type, color, fromborder, toborder){
    this.name = name
		this.id = lineid_count
		lineid_count += 1
		this.state = {
			label:label,
			type:type,
      fromborder: fromborder,
      toborder: toborder,
			frompoint: {x: from.fourSides[fromborder].x, y: from.fourSides[fromborder].y},
			topoint: {x: to.fourSides[toborder].x, y: to.fourSides[toborder].y}
		}

		this.element = document.createElementNS(svglnk, 'path')
		this.svg = document.createElementNS(svglnk, 'svg')
		this.svg.setAttribute("xmlns", svglnk)

    this.labelElement = document.createElementNS(svglnk, 'text')
    const text = document.createTextNode(this.state.label)
    this.labelElement.appendChild(text)

		this.onedirection= this.onedirection.bind(this)
		this.bidirection= this.bidirection.bind(this)

		this.getConnection = this.getConnection.bind(this)
    this.setElement()
    this.element.setAttribute("fill", "none")
		if (this.state.type == "onedirection"){
			this.onedirection()
		} else if (this.state.type == "bidirection"){
			this.bidirection()
		}
		this.element.setAttribute("stroke", color)
		this.element.setAttribute("stroke-width", "2")

		this.svg.appendChild(this.element)
    this.svg.appendChild(this.labelElement)
		from.fromConnections.push(this)
		to.toConnections.push(this)
	}

  setLabel(label){
    this.state.label = label
    this.labelElement.innerHTML = ``
    const text = document.createTextNode(this.state.label)
    this.labelElement.appendChild(text)
  }

  setColor(color){
    this.element.setAttribute("stroke", color)
  }

  setElement(){
    this.labelElement.setAttribute("x",`${(this.state.frompoint.x + this.state.topoint.x)/2}`)
    this.labelElement.setAttribute("y",`${(this.state.frompoint.y + this.state.topoint.y)/2}`)
    this.element.setAttribute("d",
              `M${this.state.frompoint.x},${this.state.frompoint.y}
               L${this.state.topoint.x},${this.state.topoint.y} `)
  }

	onedirection(){
		this.svg.innerHTML = `
			<marker id="arrowhead${this.id}" markerWidth="10" markerHeight="7"
			refX="${9.5}" refY="3.5" orient="auto">
			  <polygon points="0 0, 10 3.5, 0 7" />
			</marker>
		`
		this.element.setAttribute("marker-end", `url(#arrowhead${this.id})`)
	}

	bidirection(){
		this.svg.innerHTML = `
			<defs>
				<marker id="endarrowhead${this.id}" markerWidth="10" markerHeight="7"
				refX="${9.5}" refY="3.5" orient="auto">
				  <polygon points="0 0, 10 3.5, 0 7" />
				</marker>
				<marker id="startarrowhead${this.id}" markerWidth="10" markerHeight="7"
				refX="${0}px" refY="3.5px" orient="auto">
				  <polygon points="10 0, 10 7, 0 3.5" />
				</marker>
			</defs>
		`
		this.element.setAttribute("marker-end", `url(#endarrowhead${this.id})`)
		this.element.setAttribute("marker-start", `url(#startarrowhead${this.id})`)
	}

  setArrowColor(color){
    const markerArrow = this.svg.getElementById(`arrowhead${this.id}`)
    if (markerArrow){
      const arrowhead = markerArrow.querySelector("polygon")
      arrowhead.setAttribute("fill", color)
    }
    const markerStartArrow = this.svg.getElementById(`startarrowhead${this.id}`)
    if (markerStartArrow){
      const arrowhead = markerStartArrow.querySelector("polygon")
      arrowhead.setAttribute("fill", color)
    }
    const markerEndArrow = this.svg.getElementById(`endarrowhead${this.id}`)
    if (markerEndArrow){
      const arrowhead = markerEndArrow.querySelector("polygon")
      arrowhead.setAttribute("fill", color)
    }
  }

	shiftFirstCoordinate(diff_x, diff_y){
		this.state.frompoint.x -= diff_x
		this.state.frompoint.y -= diff_y
    this.setElement()
	}

	shiftSecondCoordinate(diff_x, diff_y){
		this.state.topoint.x -= diff_x
		this.state.topoint.y -= diff_y
    this.setElement()
	}

	getConnection(){
		return this.svg
	}
}

class CurvedLine extends Line{
  constructor(name, label, from, to, type, color, fromborder, toborder){
    super(name, label, from, to, type, color, fromborder, toborder)
    this.setElement()
  }

  setElement(){
    let mid_x = 0
    let mid_y = 0
    if (this.state.fromborder == top_num || this.state.fromborder == bottom_num){
      mid_x = this.state.frompoint.x
      mid_y = this.state.topoint.y
      this.labelElement.setAttribute("x",`${mid_x}`)
      this.labelElement.setAttribute("y",`${(this.state.topoint.y + this.state.frompoint.y)/2}`)
    } else {
      mid_x = this.state.topoint.x
      mid_y = this.state.frompoint.y
      this.labelElement.setAttribute("x",`${(this.state.topoint.x + this.state.frompoint.x)/2}`)
      this.labelElement.setAttribute("y",`${mid_y}`)
    }
    this.element.setAttribute("d",
              `M${this.state.frompoint.x},${this.state.frompoint.y}
              C${mid_x},${mid_y}
              ${mid_x},${mid_y}
              ${this.state.topoint.x},${this.state.topoint.y}`)
  }
}

class LLine extends Line{
  constructor(name, label, from, to, type, color, fromborder, toborder){
    super(name, label, from, to, type, color, fromborder, toborder)
    this.setElement()
  }

  setElement(){
    let mid_x = 0
    let mid_y = 0
    if (this.state.fromborder == top_num || this.state.fromborder == bottom_num){
      mid_x = this.state.frompoint.x
      mid_y = this.state.topoint.y
      this.labelElement.setAttribute("x",`${mid_x}`)
      this.labelElement.setAttribute("y",`${(this.state.topoint.y + this.state.frompoint.y)/2}`)
    } else {
      mid_x = this.state.topoint.x
      mid_y = this.state.frompoint.y
      this.labelElement.setAttribute("x",`${(this.state.topoint.x + this.state.frompoint.x)/2}`)
      this.labelElement.setAttribute("y",`${mid_y}`)
    }
    this.element.setAttribute("d",
              `M${this.state.frompoint.x},${this.state.frompoint.y}
              L${mid_x},${mid_y}
              L${this.state.topoint.x},${this.state.topoint.y}`)
  }
}

class ZLine extends Line{
  constructor(name, label, from, to, type, color, fromborder, toborder){
    super(name, label, from, to, type, color, fromborder, toborder)
    this.setElement()
  }

  setElement(){
    let mid_x1 = (this.state.topoint.x + this.state.frompoint.x) / 2
    let mid_y1 = this.state.frompoint.y
    let mid_x2 = (this.state.topoint.x + this.state.frompoint.x) / 2
    let mid_y2 = this.state.topoint.y
    if (this.state.fromborder == right_num || this.state.fromborder == left_num){
      let mid_x1 = this.state.frompoint.x
      let mid_y1 = (this.state.topoint.y + this.state.frompoint.y) / 2
      let mid_x2 = this.state.topoint.x
      let mid_y2 = (this.state.topoint.y + this.state.frompoint.y) / 2
    }
    this.labelElement.setAttribute("x",`${mid_x1}`)
    this.labelElement.setAttribute("y",`${(mid_y1+mid_y2)/2}`)
    this.element.setAttribute("d",
              `M${this.state.frompoint.x},${this.state.frompoint.y}
              L${mid_x1},${mid_y1}
              L${mid_x2},${mid_y2}
              ${this.state.topoint.x},${mid_y2}`)
  }
}
global.Graphybara = global.Graphybara || Graphybara
})(window, window.document);
