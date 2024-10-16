// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OrganizationManager {
    struct Organization {
        string communityType;
        string context;
        string[] hateSpeechCategories;
        address admin;
    }

    mapping(address => Organization) public organizations;
    address[] public organizationAddresses;

    event OrganizationCreated(address indexed admin, string communityType, string context);
    event OrganizationUpdated(address indexed admin, string communityType, string context);
    event HateSpeechCategoriesUpdated(address indexed admin, string[] newCategories);

    modifier onlyAdmin(address _admin) {
        require(organizations[_admin].admin == _admin, "Only the organization admin can perform this action.");
        _;
    }

    // Function to create a new organization for the sender's address
    function createOrganization(
        string memory _communityType,
        string memory _context,
        string[] memory _hateSpeechCategories
    ) public {
        require(bytes(organizations[msg.sender].communityType).length == 0, "Organization already exists for this address");

        // Save organization details
        organizations[msg.sender] = Organization({
            communityType: _communityType,
            context: _context,
            hateSpeechCategories: _hateSpeechCategories,
            admin: msg.sender
        });

        organizationAddresses.push(msg.sender);

        emit OrganizationCreated(msg.sender, _communityType, _context);
    }

    // Function to update the community type and context for the organization
    function updateOrganization(
        string memory _communityType,
        string memory _context
    ) public onlyAdmin(msg.sender) {
        Organization storage org = organizations[msg.sender];
        org.communityType = _communityType;
        org.context = _context;

        emit OrganizationUpdated(msg.sender, _communityType, _context);
    }

    // Function to update the hate speech categories for the organization
    function updateHateSpeechCategories(string[] memory _newCategories) public onlyAdmin(msg.sender) {
        Organization storage org = organizations[msg.sender];
        org.hateSpeechCategories = _newCategories;

        emit HateSpeechCategoriesUpdated(msg.sender, _newCategories);
    }

    // Function to view organization details for a specific address
    function getOrganization(address _admin) public view returns (
        string memory communityType,
        string memory context,
        string[] memory hateSpeechCategories
    ) {
        Organization storage org = organizations[_admin];
        return (org.communityType, org.context, org.hateSpeechCategories);
    }

    // Function to get all organization addresses
    function getAllOrganizationAddresses() public view returns (address[] memory) {
        return organizationAddresses;
    }
}
