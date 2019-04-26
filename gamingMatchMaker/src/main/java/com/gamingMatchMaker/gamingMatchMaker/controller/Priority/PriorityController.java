package com.gamingMatchMaker.gamingMatchMaker.controller.Priority;


import com.gamingMatchMaker.gamingMatchMaker.service.PriorityService.PriorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PriorityController {

  @Autowired
  private PriorityService service;

  @CrossOrigin
	@GetMapping("/priority/getall")
	public ResponseEntity<List<String>> getPriorities() {
		List<String> priorities = service.getAllPriorities();
		return new ResponseEntity<>(priorities,new HttpHeaders(), HttpStatus.OK);
	}
}
