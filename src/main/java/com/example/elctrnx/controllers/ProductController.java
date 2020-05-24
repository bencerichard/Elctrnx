package com.example.elctrnx.controllers;

import com.example.elctrnx.dtos.ProductDTO;
import com.example.elctrnx.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "https://elctrnx-angular.web.app")
@RequestMapping(value = "/products")
public class ProductController {

    private final ProductService productService;

    @GetMapping("/all/{username}")
    @ResponseStatus(HttpStatus.OK)
    public List<ProductDTO> getAllProducts(@PathVariable String username) {
        return productService.getProducts(username);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProductDTO newProduct(@RequestBody ProductDTO productDTO) {
        return productService.createProduct(productDTO);
    }

    @GetMapping("/{username}/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ProductDTO oneProduct(@PathVariable String username, @PathVariable Integer id) {
        return productService.getProductById(username,id);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ProductDTO updateProduct(@RequestBody ProductDTO productDTO, @PathVariable Integer id) {
        return productService.updateProduct(id, productDTO);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteProduct(@PathVariable Integer id) {
        productService.deleteProductById(id);
    }
}
