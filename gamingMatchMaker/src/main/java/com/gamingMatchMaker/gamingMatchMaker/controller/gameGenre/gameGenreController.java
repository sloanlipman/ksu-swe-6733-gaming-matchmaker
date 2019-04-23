package com.gamingMatchMaker.gamingMatchMaker.controller.gameGenre;

import com.gamingMatchMaker.gamingMatchMaker.model.GameGenre;
import com.gamingMatchMaker.gamingMatchMaker.service.gameGenre.GameGenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.ws.Response;
import java.util.List;

@RestController
@RequestMapping("/api")
public class gameGenreController {

    @Autowired
    private GameGenreService service;

    @CrossOrigin
    @GetMapping("/gameGenres")
    public ResponseEntity<List<String>> getGenreNames() {
        List<String> results = service.getGenreNames();

        HttpHeaders headers = new HttpHeaders();

        return new ResponseEntity<>(results, headers, HttpStatus.OK);
    }
}
