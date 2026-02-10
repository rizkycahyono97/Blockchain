// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

/**
 * @title PriceConverter Library
 * @author Rizky Cahyono Putra
 * @notice Library ini menyediakan fungsi untuk mengonversi nilai ETH ke USD menggunakan Chainlink Price Feed.
 * @dev Semua perhitungan dilakukan dengan standar 18 angka desimal untuk menjaga presisi di dalam smart contract.
 */
library PriceConverter {
    /**
     * @notice Mendapatkan harga ETH/USD terbaru dari Chainlink Oracles.
     * @param priceFeed Alamat kontrak AggregatorV3Interface (Chainlink).
     * @return Harga ETH dalam satuan USD dengan 18 angka desimal.
     * @dev Chainlink mengembalikan harga dengan 8 angka desimal (untuk ETH/USD),
     * sehingga kita mengalikannya dengan 1e10 agar sesuai dengan standar 18 desimal Wei.
     */
    function getPrice(
        AggregatorV3Interface priceFeed
    ) internal view returns (uint256) {
        (, int256 answer, , , ) = priceFeed.latestRoundData();
        return uint256(answer * 1e10);
    }

    /**
     * @notice Mendapatkan versi dari aggregator yang sedang digunakan.
     * @param priceFeed Alamat kontrak AggregatorV3Interface.
     * @return Versi aggregator dalam tipe data uint256.
     */
    function getVersion(
        AggregatorV3Interface priceFeed
    ) internal view returns (uint256) {
        return priceFeed.version();
    }

    /**
     * @notice Mengonversi jumlah ETH tertentu ke dalam nilai USD.
     * @param ethAmount Jumlah ETH yang ingin dikonversi (dalam satuan Wei).
     * @param priceFeed Alamat kontrak AggregatorV3Interface untuk referensi harga.
     * @return Nilai konversi ETH ke USD (dengan 18 angka desimal).
     * @dev Rumus: (Harga ETH * Jumlah ETH) / 1e18. Pembagian dengan 1e18 diperlukan karena
     * perkalian dua angka 18 desimal akan menghasilkan angka dengan 36 desimal.
     */
    function getConversionRate(
        uint256 ethAmount,
        AggregatorV3Interface priceFeed
    ) internal view returns (uint256) {
        uint256 ethPrice = getPrice(priceFeed);
        uint256 ethAmountInUSD = (ethPrice * ethAmount) / 1e18;

        return ethAmountInUSD;
    }
}
