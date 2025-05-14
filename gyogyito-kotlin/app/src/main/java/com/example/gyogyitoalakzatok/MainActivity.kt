package com.example.gyogyitoalakzatok

import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.view.Surface
import android.view.SurfaceView
import android.view.View
import android.view.animation.AnimationUtils
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.google.android.filament.Engine
import com.google.android.filament.Filament
import com.google.android.filament.View as FilamentView
import com.google.android.filament.Renderer
import com.google.android.filament.Scene
import com.google.android.filament.utils.Utils
import java.util.*
import kotlin.concurrent.scheduleAtFixedRate

class MainActivity : AppCompatActivity() {

    private lateinit var surfaceView: SurfaceView
    private lateinit var epicMessageTextView: TextView
    private lateinit var sphereButton: Button
    private lateinit var torusButton: Button
    private lateinit var cubeButton: Button
    private lateinit var coneButton: Button
    private lateinit var dodecahedronButton: Button
    private lateinit var captchaBattleButton: Button

    // Filament engine components
    private lateinit var engine: Engine
    private lateinit var renderer: Renderer
    private lateinit var scene: Scene
    private lateinit var filamentView: FilamentView
    
    // Shape rendering
    private var currentShape: ShapeType = ShapeType.SPHERE
    
    // Epic messages
    private val epicMessages = listOf(
        "wow", "much wow", "epic wow", "epic heal", "heal +9000", "gyógyulás +100", 
        "rainbow power!", "szivárvány boost", "ultra epic!", "legendary!", 
        "gyógyító energia", "✨✨✨", "maximum heal", "full epic", "gyógyító alakzat!", 
        "rainbow heal", "gyógyító szivárvány", "heal +∞", "cosmic wow", "unreal heal", 
        "epicness overload", "gyógyító csoda", "super heal", "gyógyító fény", 
        "rainbow heal +1000", "gyógyító szivárvány", "rainbow mode", "epic szivárvány", 
        "heal +1M", "gyógyító boost", "rainbow epic", "gyógyító szivárvány", "ultra wow", 
        "epicness +1000", "heal +42", "gyógyító alakzatok", "rainbow effect", "epic heal", 
        "wow", "much wow", "epic wow", "heal +xy"
    )
    
    private var timer: Timer? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        // Initialize views
        surfaceView = findViewById(R.id.surfaceView)
        epicMessageTextView = findViewById(R.id.epicMessageTextView)
        sphereButton = findViewById(R.id.sphereButton)
        torusButton = findViewById(R.id.torusButton)
        cubeButton = findViewById(R.id.cubeButton)
        coneButton = findViewById(R.id.coneButton)
        dodecahedronButton = findViewById(R.id.dodecahedronButton)
        captchaBattleButton = findViewById(R.id.captchaBattleButton)
        
        // Set up button listeners
        setupButtonListeners()
        
        // Initialize Filament
        initializeFilament()
        
        // Set up surface view for rendering
        setupSurfaceView()
    }
    
    private fun setupButtonListeners() {
        // Shape selection buttons
        sphereButton.setOnClickListener { 
            selectShape(ShapeType.SPHERE)
            updateButtonStyles()
        }
        
        torusButton.setOnClickListener { 
            selectShape(ShapeType.TORUS)
            updateButtonStyles()
        }
        
        cubeButton.setOnClickListener { 
            selectShape(ShapeType.CUBE)
            updateButtonStyles()
        }
        
        coneButton.setOnClickListener { 
            selectShape(ShapeType.CONE)
            updateButtonStyles()
        }
        
        dodecahedronButton.setOnClickListener { 
            selectShape(ShapeType.DODECAHEDRON)
            updateButtonStyles()
        }
        
        // Captcha battle button
        captchaBattleButton.setOnClickListener {
            val intent = Intent(this, CaptchaBattleActivity::class.java)
            startActivity(intent)
        }
        
        // Surface view click listener for epic messages
        surfaceView.setOnClickListener {
            showRandomEpicMessage()
        }
    }
    
    private fun initializeFilament() {
        // Initialize Filament's Engine, Scene, Renderer, and View
        Utils.init()
        engine = Engine.create()
        renderer = engine.createRenderer()
        scene = engine.createScene()
        filamentView = engine.createView()
        
        // Configure the view
        filamentView.scene = scene
        filamentView.camera = engine.createCamera()
    }
    
    private fun setupSurfaceView() {
        surfaceView.post {
            // Start rendering when the surface is ready
            surfaceView.holder.addCallback(object : android.view.SurfaceHolder.Callback {
                override fun surfaceCreated(holder: android.view.SurfaceHolder) {
                    val surface = holder.surface
                    renderer.beginFrame(surface, 0)
                    renderer.endFrame()
                    
                    // Start the render loop
                    startRenderLoop()
                    
                    // Create initial shape (sphere)
                    createShape(ShapeType.SPHERE)
                }
                
                override fun surfaceChanged(holder: android.view.SurfaceHolder, format: Int, width: Int, height: Int) {
                    filamentView.viewport = com.google.android.filament.Viewport(0, 0, width, height)
                    val aspect = width.toDouble() / height.toDouble()
                    filamentView.camera.setProjection(45.0, aspect, 0.1, 20.0, FilamentView.Camera.Fov.VERTICAL)
                }
                
                override fun surfaceDestroyed(holder: android.view.SurfaceHolder) {
                    stopRenderLoop()
                }
            })
        }
    }
    
    private fun startRenderLoop() {
        timer = Timer()
        timer?.scheduleAtFixedRate(0, 16) {
            if (surfaceView.holder.surface.isValid) {
                renderer.beginFrame(surfaceView.holder.surface, 0)
                renderer.render(filamentView)
                renderer.endFrame()
                
                // Rotate the current shape
                rotateCurrentShape()
            }
        }
    }
    
    private fun stopRenderLoop() {
        timer?.cancel()
        timer = null
    }
    
    private fun selectShape(shapeType: ShapeType) {
        currentShape = shapeType
        createShape(shapeType)
    }
    
    private fun createShape(shapeType: ShapeType) {
        // Clear existing entities from the scene
        // Create the selected shape
        // Add it to the scene
        
        // This is a simplified placeholder - in a real implementation,
        // you would create the appropriate 3D shape using Filament's
        // entity and component system
        
        when (shapeType) {
            ShapeType.SPHERE -> {
                // Create sphere
            }
            ShapeType.TORUS -> {
                // Create torus
            }
            ShapeType.CUBE -> {
                // Create cube
            }
            ShapeType.CONE -> {
                // Create cone
            }
            ShapeType.DODECAHEDRON -> {
                // Create dodecahedron
            }
        }
    }
    
    private fun rotateCurrentShape() {
        // Rotate the current shape
        // This would update the transformation of the entity in the scene
    }
    
    private fun updateButtonStyles() {
        // Reset all buttons
        sphereButton.background = ContextCompat.getDrawable(this, android.R.drawable.btn_default)
        torusButton.background = ContextCompat.getDrawable(this, android.R.drawable.btn_default)
        cubeButton.background = ContextCompat.getDrawable(this, android.R.drawable.btn_default)
        coneButton.background = ContextCompat.getDrawable(this, android.R.drawable.btn_default)
        dodecahedronButton.background = ContextCompat.getDrawable(this, android.R.drawable.btn_default)
        
        // Highlight selected button
        when (currentShape) {
            ShapeType.SPHERE -> sphereButton.setBackgroundColor(Color.parseColor("#5A4FFF"))
            ShapeType.TORUS -> torusButton.setBackgroundColor(Color.parseColor("#5A4FFF"))
            ShapeType.CUBE -> cubeButton.setBackgroundColor(Color.parseColor("#5A4FFF"))
            ShapeType.CONE -> coneButton.setBackgroundColor(Color.parseColor("#5A4FFF"))
            ShapeType.DODECAHEDRON -> dodecahedronButton.setBackgroundColor(Color.parseColor("#5A4FFF"))
        }
    }
    
    private fun showRandomEpicMessage() {
        // Get random message
        val message = epicMessages.random()
        
        // Set random color
        val hue = (Math.random() * 360).toInt()
        val color = Color.HSVToColor(floatArrayOf(hue.toFloat(), 0.9f, 0.6f))
        
        // Display message with animation
        epicMessageTextView.text = message
        epicMessageTextView.setTextColor(color)
        epicMessageTextView.visibility = View.VISIBLE
        
        // Apply animation
        val animation = AnimationUtils.loadAnimation(this, android.R.anim.fade_in)
        epicMessageTextView.startAnimation(animation)
        
        // Hide after delay
        epicMessageTextView.postDelayed({
            epicMessageTextView.visibility = View.GONE
        }, 1500)
    }
    
    override fun onDestroy() {
        super.onDestroy()
        stopRenderLoop()
        
        // Clean up Filament resources
        engine.destroyRenderer(renderer)
        engine.destroyView(filamentView)
        engine.destroyScene(scene)
        Engine.destroy()
    }
}

enum class ShapeType {
    SPHERE,
    TORUS,
    CUBE,
    CONE,
    DODECAHEDRON
}
