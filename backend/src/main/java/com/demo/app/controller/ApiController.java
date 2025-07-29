package com.demo.app.controller;

import com.demo.app.dto.ProcessRequest;
import com.demo.app.dto.ProcessResponse;
import com.demo.app.service.DataProcessingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Demo API", description = "API endpoints for the demo application")
public class ApiController {

    private final DataProcessingService dataProcessingService;

    @Autowired
    public ApiController(DataProcessingService dataProcessingService) {
        this.dataProcessingService = dataProcessingService;
    }

    @PostMapping("/process")
    @Operation(
        summary = "Process Data",
        description = "Process user input data and return processed result"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200", 
            description = "Data processed successfully",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ProcessResponse.class),
                examples = @ExampleObject(
                    name = "Success Response",
                    value = """
                        {
                          "message": "Data processed successfully!",
                          "data": "HELLO WORLD",
                          "timestamp": "2024-01-01T12:00:00"
                        }
                        """
                )
            )
        ),
        @ApiResponse(
            responseCode = "400", 
            description = "Bad request - invalid input data",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ProcessResponse.class),
                examples = @ExampleObject(
                    name = "Error Response",
                    value = """
                        {
                          "message": "Error: Input data cannot be null or empty",
                          "data": "",
                          "timestamp": "2024-01-01T12:00:00"
                        }
                        """
                )
            )
        ),
        @ApiResponse(
            responseCode = "500", 
            description = "Internal server error"
        )
    })
    public ResponseEntity<ProcessResponse> processData(
        @Parameter(
            description = "Data to process",
            required = true,
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ProcessRequest.class),
                examples = @ExampleObject(
                    name = "Request Example",
                    value = """
                        {
                          "data": "hello world"
                        }
                        """
                )
            )
        )
        @Valid @RequestBody ProcessRequest request
    ) {
        try {
            String processedData = dataProcessingService.processData(request.getData());
            ProcessResponse response = new ProcessResponse(
                "Data processed successfully!",
                processedData
            );
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            ProcessResponse errorResponse = new ProcessResponse(
                "Error: " + e.getMessage(),
                request.getData()
            );
            return ResponseEntity.badRequest().body(errorResponse);
        } catch (Exception e) {
            ProcessResponse errorResponse = new ProcessResponse(
                "Internal server error occurred",
                request.getData()
            );
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/health")
    @Operation(
        summary = "Health Check",
        description = "Check if the backend service is running"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200", 
            description = "Service is healthy",
            content = @Content(
                mediaType = "text/plain",
                examples = @ExampleObject(
                    name = "Health Response",
                    value = "Backend is running!"
                )
            )
        )
    })
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Backend is running!");
    }
}