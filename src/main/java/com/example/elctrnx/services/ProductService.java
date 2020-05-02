package com.example.elctrnx.services;

import com.example.elctrnx.dtos.FavoritesDTO;
import com.example.elctrnx.dtos.ProductDTO;
import com.example.elctrnx.entities.Product;
import com.example.elctrnx.entities.ProductCategory;
import com.example.elctrnx.exceptions.ProductNotFoundException;
import com.example.elctrnx.mappers.ProductMapper;
import com.example.elctrnx.repositories.ProductCategoryRepository;
import com.example.elctrnx.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @Autowired
    private FavoritesService favoritesService;

    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = Product.builder().name(productDTO.getProductName())
                .description(productDTO.getDescription())
                .price(productDTO.getPrice())
                .image(productDTO.getImage())
                .isFavorite(productDTO.getIsFavorite())
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
            existingProduct.setIsFavorite(productDTO.getIsFavorite());
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

    public ProductDTO getProductById(String username,Integer id) throws ProductNotFoundException {
        Optional<Product> productOptional = productRepository.findById(id);

        if (productOptional.isPresent()) {

            Product existingProduct = productOptional.get();

            List<FavoritesDTO> favorites = favoritesService.getFavoritesforUserWithUsername(username);

            existingProduct.setIsFavorite(false);

            favorites.forEach( favoritesDTO -> {
                if(existingProduct.getProductId().equals(favoritesDTO.getProductId()))
                    existingProduct.setIsFavorite(true);
            });

            return productMapper.mapProductToProductDto(existingProduct);
        } else {
            throw new ProductNotFoundException("This product doesn't exist");
        }
    }

    public List<ProductDTO> getProducts(String username) {
        List<Product> products = productRepository.findAll();

        List<FavoritesDTO> favorites = favoritesService.getFavoritesforUserWithUsername(username);
        products.forEach(
                product -> {
                    product.setIsFavorite(false);
                    favorites.forEach( favoritesDTO -> {
                        if(product.getProductId().equals(favoritesDTO.getProductId()))
                            product.setIsFavorite(true);
                    });
                }
        );

        return products.stream().map(productMapper::mapProductToProductDto)
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
