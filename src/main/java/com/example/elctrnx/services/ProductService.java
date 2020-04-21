package com.example.elctrnx.services;

import com.example.elctrnx.dtos.ProductDTO;
import com.example.elctrnx.entities.Product;
import com.example.elctrnx.entities.ProductCategory;
import com.example.elctrnx.exceptions.ProductNotFoundException;
import com.example.elctrnx.mappers.ProductMapper;
import com.example.elctrnx.repositories.ProductCategoryRepository;
import com.example.elctrnx.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final ProductCategoryRepository productCategoryRepository;

    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = Product.builder().name(productDTO.getProductName())
                .description(productDTO.getDescription())
                .price(productDTO.getPrice())
                .image(productDTO.getImage())
                .producer(productDTO.getProducer())
                .productCategory(this.testCategoryExistence(productDTO.getCategoryName(), productDTO.getCategoryDescription()))
                .build();
        productRepository.save(product);
        return productMapper.mapProductToProductDto(product);
    }

    public ProductDTO updateProduct(Integer id, ProductDTO productDTO) {
        if (productRepository.findById(id).isPresent()) {
            Product existingProduct = productRepository.findById(id).get();
            existingProduct.setName(productDTO.getProductName());
            existingProduct.setPrice(productDTO.getPrice());
            existingProduct.setDescription(productDTO.getDescription());
            existingProduct.setImage(productDTO.getImage());
            existingProduct.setProducer(productDTO.getProducer());
            existingProduct.setProductCategory(this.testCategoryExistence(productDTO.getCategoryName(), productDTO.getCategoryDescription()));

            Product updatedProduct = productRepository.save(existingProduct);
            return productMapper.mapProductToProductDto(updatedProduct);
        } else {
            throw new ProductNotFoundException("This product doesn't exist");
        }
    }

    public void deleteProductById(Integer productId) throws ProductNotFoundException {
        productRepository.deleteById(productId);
    }

    public ProductDTO getProductById(Integer id) throws ProductNotFoundException {
        Optional<Product> productOptional = productRepository.findById(id);

        if (productOptional.isPresent()) {
            return productMapper.mapProductToProductDto(productOptional.get());
        } else {
            throw new ProductNotFoundException("This product doesn't exist");
        }
    }

    public List<ProductDTO> getProducts() {
        List<Product> prod = productRepository.findAll();
        return prod.stream().map(productMapper::mapProductToProductDto)
                .collect(Collectors.toList());
    }

    public ProductCategory testCategoryExistence(String categoryName, String categoryDescription) {
        Optional<ProductCategory> productCategory = productCategoryRepository.findByName(categoryName);
        ProductCategory prod = null;

        if (productCategory.isPresent()) {
            prod = productCategory.get();
        } else {
            prod = new ProductCategory();
            prod.setName(categoryName);
            prod.setDescription(categoryDescription);
            productCategoryRepository.save(prod);
        }
        return prod;
    }
}
