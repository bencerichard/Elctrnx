package com.example.elctrnx.controllers;

import com.example.elctrnx.entities.Image;
import com.example.elctrnx.entities.User;
import com.example.elctrnx.services.ImageService;
import com.example.elctrnx.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/image")
public class ImageController {

    //TODO change dependecy injection to RequiredArgsConstructor
    @Autowired
    ImageService imageService;

    //TODO change dependecy injection to RequiredArgsConstructor
    @Autowired
    private UserService userService;

    @PostMapping("/upload/{username}")
    public RequestEntity.BodyBuilder uplaodImage(@RequestParam("imageFile") MultipartFile file, @PathVariable String username) throws IOException {

        User user = userService.findUserByUsername(username);

        Image img = Image.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .picByte(compressBytes(file.getBytes()))
                .build();

        imageService.save(img);

        user.setImage(img);
        userService.setUserImage(username,img);

        return (RequestEntity.BodyBuilder) ResponseEntity.status(HttpStatus.OK);
    }

    @GetMapping(path = { "/get/{username}" })
    public Image getImage(@PathVariable("username")String username) throws IOException {

        User user = userService.findUserByUsername(username);

        final Image retrievedImage = user.getImage();
        return Image.builder()
                .name(retrievedImage.getName())
                .type(retrievedImage.getType())
                .picByte(decompressBytes(retrievedImage.getPicByte()))
                .build();
    }

    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[2048];
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
        byte[] buffer = new byte[2048];
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
