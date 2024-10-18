// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OrganizationManager {
    struct Organization {
        uint orgId; 
        string communityType;
        string context;
        string[] hateSpeechCategories;
        address admin;
        bool isPrivate; 
    }

    mapping(address => Organization[]) public organizations;
    address[] public organizationAddresses;

    uint public nextOrgId; 

    event OrganizationCreated(address indexed admin, uint orgId, string communityType, string context, bool isPrivate);
    event OrganizationUpdated(address indexed admin, uint orgId, string communityType, string context, bool isPrivate);
    event HateSpeechCategoriesUpdated(address indexed admin, uint orgId, string[] newCategories);

    modifier onlyAdmin(uint orgIndex) {
        require(organizations[msg.sender][orgIndex].admin == msg.sender, "Only the organization admin can perform this action.");
        _;
    }

    constructor() {
        nextOrgId = 1; 
    }

    function createOrganization(
        string memory _communityType,
        string memory _context,
        string[] memory _hateSpeechCategories,
        bool _isPrivate 
    ) public {
        uint orgId = nextOrgId; 
        nextOrgId++;

        organizations[msg.sender].push(Organization({
            orgId: orgId,
            communityType: _communityType,
            context: _context,
            hateSpeechCategories: _hateSpeechCategories,
            admin: msg.sender,
            isPrivate: _isPrivate 
        }));

        if (organizations[msg.sender].length == 1) {
            organizationAddresses.push(msg.sender);
        }

        emit OrganizationCreated(msg.sender, orgId, _communityType, _context, _isPrivate);
    }

    function updateOrganization(
        uint orgIndex,
        string memory _communityType,
        string memory _context,
        bool _isPrivate 
    ) public onlyAdmin(orgIndex) {
        Organization storage org = organizations[msg.sender][orgIndex];
        org.communityType = _communityType;
        org.context = _context;
        org.isPrivate = _isPrivate;

        emit OrganizationUpdated(msg.sender, org.orgId, _communityType, _context, _isPrivate);
    }

    function updateHateSpeechCategories(uint orgIndex, string[] memory _newCategories) public onlyAdmin(orgIndex) {
        Organization storage org = organizations[msg.sender][orgIndex];
        org.hateSpeechCategories = _newCategories;

        emit HateSpeechCategoriesUpdated(msg.sender, org.orgId, _newCategories);
    }

    function getOrganizationById(address _admin, uint _orgId) public view returns (
        uint orgId,
        string memory communityType,
        string memory context,
        string[] memory hateSpeechCategories,
        bool isPrivate 
    ) {
        Organization[] storage orgs = organizations[_admin];
        for (uint i = 0; i < orgs.length; i++) {
            if (orgs[i].orgId == _orgId) {
                Organization storage org = orgs[i];
                return (org.orgId, org.communityType, org.context, org.hateSpeechCategories, org.isPrivate);
            }
        }
        revert("Organization not found."); 
    }

    function getAllOrganizationAddresses() public view returns (address[] memory) {
        return organizationAddresses;
    }

    function getAllOrganizations(address _admin) public view returns (Organization[] memory) {
        return organizations[_admin];
    }

    function getAllOrganizationsGlobal() public view returns (Organization[] memory) {
        uint totalOrganizations = 0;
        for (uint i = 0; i < organizationAddresses.length; i++) {
            totalOrganizations += organizations[organizationAddresses[i]].length;
        }

        Organization[] memory allOrgs = new Organization[](totalOrganizations);
        uint currentIndex = 0;

        for (uint i = 0; i < organizationAddresses.length; i++) {
            Organization[] storage orgsForAddress = organizations[organizationAddresses[i]];
            for (uint j = 0; j < orgsForAddress.length; j++) {
                allOrgs[currentIndex] = orgsForAddress[j];
                currentIndex++;
            }
        }
        return allOrgs;
    }
}
