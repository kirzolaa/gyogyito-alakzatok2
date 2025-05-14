package com.example.gyogyitoalakzatok

import android.graphics.Color
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.CheckBox
import android.widget.GridLayout
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import kotlin.random.Random

class CaptchaBattleActivity : AppCompatActivity() {

    private lateinit var captchaImageView: ImageView
    private lateinit var captchaOptionsGrid: GridLayout
    private lateinit var verifyButton: Button
    private lateinit var backButton: Button
    private lateinit var resultTextView: TextView
    
    private val captchaOptions = listOf(
        "Autó", "Bicikli", "Tűzcsap", "Zebra", "Busz", "Jelzőlámpa", 
        "Híd", "Pálmafa", "Motorkerékpár", "Hegy", "Folyó", "Tó"
    )
    
    private val correctOptions = mutableListOf<String>()
    private val selectedOptions = mutableSetOf<String>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_captcha_battle)
        
        // Initialize views
        captchaImageView = findViewById(R.id.captchaImageView)
        captchaOptionsGrid = findViewById(R.id.captchaOptionsGrid)
        verifyButton = findViewById(R.id.verifyButton)
        backButton = findViewById(R.id.backButton)
        resultTextView = findViewById(R.id.resultTextView)
        
        // Set captcha image
        captchaImageView.setImageResource(R.drawable.captcha_placeholder)
        
        // Generate random captcha challenge
        generateCaptchaChallenge()
        
        // Set up button listeners
        verifyButton.setOnClickListener {
            verifyCaptcha()
        }
        
        backButton.setOnClickListener {
            finish()
        }
    }
    
    private fun generateCaptchaChallenge() {
        // Clear previous options
        captchaOptionsGrid.removeAllViews()
        correctOptions.clear()
        selectedOptions.clear()
        
        // Randomly select 3-5 correct options
        val numCorrectOptions = Random.nextInt(3, 6)
        val shuffledOptions = captchaOptions.shuffled()
        
        for (i in 0 until numCorrectOptions) {
            correctOptions.add(shuffledOptions[i])
        }
        
        // Create checkboxes for all options
        for (i in captchaOptions.indices) {
            val option = captchaOptions[i]
            val checkBox = CheckBox(this)
            checkBox.text = option
            checkBox.textSize = 16f
            checkBox.setTextColor(Color.WHITE)
            
            // Set checkbox listener
            checkBox.setOnCheckedChangeListener { _, isChecked ->
                if (isChecked) {
                    selectedOptions.add(option)
                } else {
                    selectedOptions.remove(option)
                }
            }
            
            // Add to grid
            val params = GridLayout.LayoutParams()
            params.rowSpec = GridLayout.spec(i / 3)
            params.columnSpec = GridLayout.spec(i % 3)
            params.setMargins(8, 8, 8, 8)
            captchaOptionsGrid.addView(checkBox, params)
        }
    }
    
    private fun verifyCaptcha() {
        // Check if selected options match correct options
        val isCorrect = selectedOptions.size == correctOptions.size && 
                        selectedOptions.containsAll(correctOptions)
        
        // Display result
        resultTextView.visibility = View.VISIBLE
        
        if (isCorrect) {
            resultTextView.text = getString(R.string.verification_success)
            resultTextView.setTextColor(ContextCompat.getColor(this, android.R.color.holo_green_light))
        } else {
            resultTextView.text = getString(R.string.verification_failure)
            resultTextView.setTextColor(ContextCompat.getColor(this, android.R.color.holo_red_light))
        }
    }
}
