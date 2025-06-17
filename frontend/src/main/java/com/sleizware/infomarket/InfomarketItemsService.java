package com.sleizware.infomarket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InfomarketItemsService {

    @Autowired
    private InfomarketRepository infomarketRepository;

    public List<InfomarketItems> allItems() {
        System.out.println(infomarketRepository.findAll().toString());
        return infomarketRepository.findAll();
    }
}
