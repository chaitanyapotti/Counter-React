pragma solidity ^0.4.24;


library SafeMath {

    function safeMul(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a * b;
        assert(a == 0 || c / a == b);
        return c;
    }

    function safeDiv(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a / b;
        return c;
    }

    function safeSub(uint256 a, uint256 b) internal pure returns (uint256) {
        assert(a >= b);
        return a - b;
    }

    function safeAdd(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        assert(c >= a);
        return c;
    }
}


//generic implementation of ERC20 Token - ropsten
contract SpvToken {

    string public name = "Stokens Fund SPV";
    string public symbol = "SFSPV";
    uint8 public decimals= 0;
    uint256 public totalSupply = 10000000;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) public allowed;

    constructor() public {
        balances[msg.sender] = totalSupply;
    }

    function totalSupplyAmount() public view returns (uint256) {
        return totalSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool) {
        require(_to != address(0), "Can't send to 0x address");
        require(balances[msg.sender] >= _value, "Low balance alert");

        balances[msg.sender] = SafeMath.safeSub(balances[msg.sender], _value);
        balances[_to] = SafeMath.safeAdd(balances[_to], _value);
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
        require(_to != address(0), "Can't send to 0x address");
        require(balances[_from] >= _value && allowed[_from][msg.sender] >= _value, "Low balance alert");

        balances[_to] = SafeMath.safeAdd(balances[_to], _value);
        balances[_from] = SafeMath.safeSub(balances[_from], _value);
        allowed[_from][msg.sender] = SafeMath.safeSub(allowed[_from][msg.sender], _value);
        emit Transfer(_from, _to, _value);
        return true;
    }

    function balanceOf(address _owner) public view returns (uint256) {
        return balances[_owner];
    }

    function approve(address _spender, uint256 _value) public returns (bool) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint256) {
        return allowed[_owner][_spender];
    }
}