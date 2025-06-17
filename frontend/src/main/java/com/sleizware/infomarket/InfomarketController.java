package com.sleizware.infomarket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/items")
public class InfomarketController {
    @Autowired
    private InfomarketItemsService infomarketItemsService;
    @GetMapping
    public ResponseEntity<List<InfomarketItems>>getAllItems() {
        return new ResponseEntity<List<InfomarketItems>>(infomarketItemsService.allItems(), HttpStatus.OK);
    }
}
