package com.example.elctrnx.controllers;

import com.example.elctrnx.entities.Image;
import com.example.elctrnx.repositories.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/image")
public class ImageController {

    @Autowired
    ImageRepository imageRepository;

    @PostMapping("/upload")
    public RequestEntity.BodyBuilder uplaodImage(@RequestParam("imageFile") MultipartFile file) throws IOException {

        System.out.println("Original Image Byte Size - " + file.getBytes().length);
        Image img = Image.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .picByte(compressBytes(file.getBytes()))
                .build();

        imageRepository.save(img);
        return (RequestEntity.BodyBuilder) ResponseEntity.status(HttpStatus.OK);
    }

    @GetMapping(path = { "/get/{imageName}" })
    public Image getImage(@PathVariable("imageName") String imageName) throws IOException {

        final Optional<Image> retrievedImage = imageRepository.findByName(imageName);
        return Image.builder()
                        .name(retrievedImage.get().getName())
                        .type(retrievedImage.get().getType())
                        .picByte(decompressBytes(retrievedImage.get().getPicByte()))
                        .build();
    }

    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
        }
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);

        return outputStream.toByteArray();
    }

    public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException ioe) {
        } catch (DataFormatException e) {
        }
        return outputStream.toByteArray();
    }
}
