package com.demo.app.service;

import org.springframework.stereotype.Service;

@Service
public class DataProcessingService {
    
    public String processData(String inputData) {
        if (inputData == null || inputData.trim().isEmpty()) {
            throw new IllegalArgumentException("Input data cannot be null or empty");
        }
        
        // Simple processing: convert to uppercase and add some processing info
        String processedData = inputData.trim().toUpperCase();
        
        // Add some simple processing logic
        if (processedData.length() > 50) {
            processedData = processedData.substring(0, 50) + "... (truncated)";
        }
        
        return processedData;
    }
}