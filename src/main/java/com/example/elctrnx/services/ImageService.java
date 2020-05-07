package com.example.elctrnx.services;

import com.example.elctrnx.entities.Image;
import com.example.elctrnx.repositories.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final ImageRepository imageRepository;

    public Image save(Image image){
        return imageRepository.save(image);
    }
}
