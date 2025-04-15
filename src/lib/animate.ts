
// Animation utility functions for the dashboard

export type AnimationDirection = "up" | "down" | "left" | "right";

/**
 * Applies a fade-in animation to the element
 * @param element The element to animate
 * @param delay Optional delay in milliseconds
 * @param duration Optional duration in milliseconds
 */
export function fadeIn(element: HTMLElement, delay = 0, duration = 500): void {
  if (!element) return;
  
  element.style.opacity = "0";
  element.style.transition = `opacity ${duration}ms ease-in-out ${delay}ms`;
  
  // Trigger reflow
  void element.offsetWidth;
  
  element.style.opacity = "1";
}

/**
 * Applies a slide-in animation to the element
 * @param element The element to animate
 * @param direction The direction to slide from
 * @param distance The distance to slide
 * @param delay Optional delay in milliseconds
 * @param duration Optional duration in milliseconds
 */
export function slideIn(
  element: HTMLElement, 
  direction: AnimationDirection = "up", 
  distance = "20px",
  delay = 0,
  duration = 500
): void {
  if (!element) return;
  
  let transform = "";
  
  switch (direction) {
    case "up":
      transform = `translateY(${distance})`;
      break;
    case "down":
      transform = `translateY(-${distance})`;
      break;
    case "left":
      transform = `translateX(${distance})`;
      break;
    case "right":
      transform = `translateX(-${distance})`;
      break;
  }
  
  element.style.opacity = "0";
  element.style.transform = transform;
  element.style.transition = `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`;
  
  // Trigger reflow
  void element.offsetWidth;
  
  element.style.opacity = "1";
  element.style.transform = "translate(0, 0)";
}

/**
 * Creates a staggered animation for a list of elements
 * @param elements Array of elements to animate
 * @param animationFn Animation function to apply to each element
 * @param staggerDelay Delay between each element animation
 */
export function staggerAnimation(
  elements: HTMLElement[],
  animationFn: (el: HTMLElement, delay: number) => void,
  staggerDelay = 100
): void {
  elements.forEach((el, index) => {
    const delay = index * staggerDelay;
    animationFn(el, delay);
  });
}
