import { useRef } from "react";
import { Avatar, Button, Circle, Combobox, Flex, Float, Heading, Portal, useFilter, useListCollection } from "@chakra-ui/react";

interface HeaderProps {
    isLoggedIn: boolean,
    name: string,
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, name }) => {

    const trendingSearchItems = ["trending search 1", "trending search 2", "trending search 3"] //TO BE REPLACED WITH REAL VALUES

    const { contains } = useFilter({sensitivity: "base"})
    const { collection, filter} = useListCollection({
        initialItems: trendingSearchItems,
        filter: contains
    })

    const searchBarRef = useRef<HTMLInputElement>(null);

    const navigateToProfilePage = () => {
        /* Insert the logic to navigateto the user's profile page upon clicking the avatar */
    }

    const search = (query:string) => {
        /* Call the methods used for the search logic and change pages to search page */
        
    }


    const renderHeaderNotLoggedIn = () => {
        return (
                <Flex 
                    paddingY={"3"}
                    paddingX={"8"}
                    borderBottom={"solid"}
                    borderBottomWidth={"thin"}
                    direction={"row"}
                    width={"full"}
                    height={"full"}
                    justifyContent={"space-between"}
                    >
                    <Heading 
                        size={"5xl"}
                        color={"#6858f5"}
                        height={"full"}
                        >
                        Blogger
                    </Heading>
                    <Flex
                        direction={"row"}
                        justifyContent={"space-between"}
                        gap={"2"}
                        >
                        <Button
                            alignSelf={"center"}
                            backgroundColor={"#6858f5"}
                            color={"white"}
                            borderRadius={"full"}    
                            boxShadow={"2px 2px 6px 2px rgba(0,0,0,0.2)"}    
                            fontSize={"lg"}
                            width={"100px"}
                            paddingY={"5"}
                            _hover={{ opacity: "0.8" }}        
                            >Log In
                        </Button>
                        <Button
                            alignSelf={"center"}
                            backgroundColor={"white"}
                            color={"#6858f5"}
                            borderRadius={"full"}
                            boxShadow={"2px 2px 6px 2px rgba(0,0,0,0.2)"}
                            fontSize={"lg"}
                            width={"100px"}
                            paddingY={"5"}
                            _hover={{ opacity: "0.8" }}  
                            >
                            Sign Up
                        </Button>
                    </Flex>
                </Flex>
        )
    }

    const renderSearchBar = () => {
        return(
            <Combobox.Root 
                collection={collection}
                onKeyDown={(e) => {
                    //Logic for when user clicks enter in the search bar
                    const query = searchBarRef.current?.value
                    if(e.key === "Enter" && query !== undefined)
                        search(query)
                }}
                onInputValueChange={(e) => filter(e.inputValue)}
                width={"6xl"}
                openOnClick
                >
                <Combobox.Control>
                    <Combobox.Input 
                        ref={searchBarRef} 
                        placeholder="Search posts..."
                        />
                </Combobox.Control>
                <Portal>
                    <Combobox.Positioner>
                        <Combobox.Content>
                            {collection.items.map((item) => (
                                <Combobox.Item 
                                    onClick={() => search(item)} 
                                    key={item} 
                                    item={item}
                                    >
                                    {item}
                                </Combobox.Item>
                            ))}
                        </Combobox.Content>
                    </Combobox.Positioner>
                </Portal>
            </Combobox.Root>
        )
    }

    const renderHeaderLoggedIn = () => {
        return (                
            <Flex 
                paddingY={"3"}
                paddingX={"8"}
                borderBottom={"solid"}
                borderBottomWidth={"thin"}
                direction={"row"}
                width={"full"}
                height={"full"}
                justifyContent={"space-between"}
                alignItems={"center"}
                >
                <Heading 
                    size={"5xl"}
                    color={"#6858f5"}
                    height={"full"}
                    >
                    Blogger
                </Heading>
                {renderSearchBar()}
                <Avatar.Root 
                    cursor={"pointer"} 
                    size={"xl"} 
                    onClick={navigateToProfilePage}
                    >
                    <Avatar.Fallback name={name}/>
                    <Float 
                        placement={"bottom-end"} 
                        offsetX={2} 
                        offsetY={2}
                        >
                        <Circle 
                            bg={"green.500"} 
                            size={"2.5"} 
                            outline={"0.12em solid"} 
                            />
                    </Float>
                </Avatar.Root>
            </Flex>
        )
    }

    return isLoggedIn ? renderHeaderLoggedIn() : renderHeaderNotLoggedIn();

}

export default Header;