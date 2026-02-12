// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "./PriceConverter.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

error FundMe_NotOwner();

/**
 * @title A Simple Contract for Funding
 * @author Rizky Cahyono Putra, https://github.com/rizkycahyono97
 * @notice This contract is to demo a sample funding contract
 * @dev this using Chainlink price feed for price converter USD to ETH
 */
contract FundMe {
    // Type Declarations
    using PriceConverter for uint256;

    /// @notice jumlah minimum donasi dalam USD (dengan angka desimal)
    uint256 public constant MINIMUM_USD = 50 * 1e18;

    /// @dev Alamat interface aggregator harga Chainlink
    AggregatorV3Interface private immutable i_priceFeed;

    /// @notice alamat pemilik kontrak yang memiliki hak akses owner
    address private immutable i_owner;

    /// @notice alamat para funders
    address[] private s_funders;

    /// @notice mapping dari alamat donatur ke jumlah saldo yang didonasikan
    mapping(address => uint256) public s_addressToAmountFunded;

    /**
     * @param priceFeedAddress alamat aggregator dari chainlink, https://docs.chain.link/data-feeds/price-feeds/addresses?network=ethereum&networkType=testnet
     */
    constructor(address priceFeedAddress) {
        i_owner = msg.sender;
        i_priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    /**
     * @notice fungsi untuk mengirimkan donasi ke dalam kontrak
     * @dev getConversionRate = konversi dari dolar ke gwei ETH
     */
    function fund() public payable {
        require(
            msg.value.getConversionRate(i_priceFeed) >= MINIMUM_USD,
            "Didn't send enough!"
        );
        s_funders.push(msg.sender);
        s_addressToAmountFunded[msg.sender] += msg.value;
    }

    /**
     * @notice fungsi untuk menarik seluruh saldo dari kontrak
     * @dev hanya owner. Dan reset saldo di array funders
     */
    function withdraw() public onlyOwner {
        for (
            uint256 funderIndex = 0;
            funderIndex < s_funders.length;
            funderIndex++
        ) {
            address funder = s_funders[funderIndex];
            s_addressToAmountFunded[funder] = 0;
        }
        s_funders = new address[](0);

        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Call not success");
    }

    /**
     * @notice fungsi untuk menarik seluruh saldo dari kontrak, tettapi menggunakan copy address ke memory
     * @dev hanya owner. Dan reset saldo di array funders
     */
    function cheaperWithdraw() public onlyOwner {
        address[] memory funders = s_funders;

        for (uint256 i = 0; i < funders.length; i++) {
            address funder = funders[i];
            s_addressToAmountFunded[funder] = 0;
        }

        s_funders = new address[](0);

        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Call not success");
    }

    /**
     * @dev modifier untuk membatasi akses fungsi ke pemilik kontrak
     */
    modifier onlyOwner() {
        if (msg.sender != i_owner) revert FundMe_NotOwner();
        _;
    }

    /**
     * @dev Fungsi khusus jika seseorang mengirim ETH tanpa memanggil fungsi fund()
     */
    receive() external payable {
        fund();
    }

    /**
     * @notice Fungsi cadangan jika data yang dikirim tidak cocok dengan fungsi manapun
     */
    fallback() external payable {
        fund();
    }

    /**
     * @notice Mengambil alamat price feed yang sedang digunakan
     * @return Alamat dari AggregatorV3Interface
     */
    function getPriceFeed() external view returns (address) {
        return address(i_priceFeed);
    }

    /**
     * @notice getter untuk i_owner
     * @return address i_owner
     */
    function getOwner() public view returns (address) {
        return i_owner;
    }

    /**
     * @notice getter untuk s_funders[index]
     * @return address s_funders
     */
    function getFunder(uint256 index) public view returns (address) {
        return s_funders[index];
    }
}
